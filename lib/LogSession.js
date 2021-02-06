/* eslint-disable no-underscore-dangle */
/**
 * see: https://www.freecodecamp.org/news/how-to-add-typescript-to-a-javascript-project/
 *
 */
const winston = require('winston');
const { resolve } = require('path');
require('winston-daily-rotate-file');
const uuid = require('uuid');

process.env.STAGE = process.env.STAGE || 'dev';
const offlineEnv = process.env.IS_OFFLINE || process.env.IS_LOCAL;

/**
 * config.syslog.levels:
 *  - emerg: 0
 *  - alert: 1
 *  - crit: 2
 *  - error: 3
 *  - warning: 4
 *  - notice: 5
 *  - info: 6
 *  - debug: 7
 */

/**
  * Additionally, you can also change background color and font style. For example,

    baz: 'italic yellow',
    foobar: 'bold red cyanBG'

    Possible options are below.

        Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.

        Font foreground colors: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.

        Background colors: blackBG, redBG, greenBG, yellowBG, blueBG magentaBG, cyanBG, whiteBG

  */
const customColors = {
  emerg: 'bold yellow redBG',
  alert: 'yellow redBG',
  crit: 'black redBG',
  error: 'red',
  warning: 'yellow',
  notice: 'green',
  info: 'green',
  debug: 'blue',
};

winston.addColors(customColors);


function collapse(str, length) {
  if (!str) return '';
  if (str.length <= length) return str;
  const newStr = `${str.slice(0, length - 3)}...`;
  return newStr;
}

function cellR(cell, width) {
  width = width || cell.length;
  return cell.padStart(width + 1, ' ').padEnd(width + 2, ' ');
}
function cellL(cell, width) {
  width = width || cell.length;
  return cell.padEnd(width + 1, ' ');
}

let session = null;
/**
 *
 * log structure
 * timestamp: string
 * level: string [emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7)]
 * label: string
 * context: object
 * data: object
 *
 * Nota:
 * -
 */
class LogSession {
  constructor() {
    this._currentLabel = null;
    this._currentLogger = null;
    this._context = {
      loggerId: uuid.v4(),
    };
    this.fileTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-errors.log',
      // auditFile: 'logs/%DATE%-audit.json',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      // maxSize: '20m',
      maxFiles: '24h',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });
    this.consoleTransport = new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.cli(),
        winston.format.printf(LogSession.logFormatTemplate),
      ),
    });


    // exceptionHandlers: [
    //   new transports.Console({
    //     handleExceptions: true,
    //     format: format.combine(
    //       format.colorize(),
    //       format.printf((info) => `${printf(info)}`),
    //     ),
    //   }),
    // ],
  }

  static getInstance() {
    if (!session) {
      session = new LogSession();
    }
    return session;
  }

  static addContext(context, overwrite = false) {
    session = this.getInstance();
    if (overwrite) {
      const newContext = {
        ...session._context,
        ...JSON.parse(JSON.stringify(context)),
      };
      session._context = newContext;
    } else {
      const newContext = {
        ...JSON.parse(JSON.stringify(context)),
        ...session._context,
      };
      session._context = newContext;
    }
    // refresh current session logger if exists
    if (session && session._currentLogger) {
      session._currentLogger.defaultMeta._context = session._context;
    }
    return this;
  }

  static getLogger(label = 'GENERIC') {
    session = this.getInstance();

    if (!winston.loggers.has(label)) {
      winston.loggers.add(label, {
        defaultMeta: {
          _context: session._context,
        },
        levels: winston.config.syslog.levels,
        exitOnError: false,
        level: process.env.LOG_LEVEL || 'debug',
        transports: [session.consoleTransport, session.fileTransport],
        format: winston.format.label({ label }),
      });
    }
    session._currentLabel = label;
    session._currentLogger = winston.loggers.get(label);
    return session._currentLogger;
  }

  static logFormatTemplate(info) {
    // ${info.timestamp}
    // const infoCell = cellL(info.level)
    return `${info.level} [${info.label}] ${info.message}`;
  }
}

module.exports = LogSession;