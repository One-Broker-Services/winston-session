/* eslint-disable no-underscore-dangle */
/**
 * see: https://www.freecodecamp.org/news/how-to-add-typescript-to-a-javascript-project/
 *
 */
const winston = require('winston');
require('winston-daily-rotate-file');
const uuid = require('uuid');

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

function logFormatTemplate(info) {
  return `${info.level}\t${info._context.sessionId} [${info.label}] ${info.message}`;
}

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
const custom = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    info: 5,
    verbose: 6,
    debug: 7,
  },
  colors: {
    emerg: 'bold yellow redBG',
    alert: 'yellow redBG',
    crit: 'black redBG',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    verbose: 'green',
    debug: 'blue',
  },
  transportsOpt: {
    offlineConsole: {
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(), // winston.format.cli(),
        winston.format.printf(logFormatTemplate),
      ),
    },
    onlineConsole: {
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.json(),
      ),
    },
    file: {
      handleExceptions: true,
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
    },
    els: null,
    sentry: null,
  },
};

function initContext() {
  return {
    sessionId: uuid.v4(),
  };
}

let session = null; // for singleton instance
/**
 *
 * log structure
 * timestamp: string
 * level: string [emerg (0) <- alert <- crit <- error<- warning<- notice <- info <- debug (7)]
 * label: string
 * context: object
 * data: object
 *
 * Nota:
 * -
 */
class SessionLogger {
  constructor() {
    winston.addColors(custom.colors);
    this._context = initContext();

    this._level = process.env.LOG_LEVEL || 'debug';
    this._currentLabel = null;
    this._currentLogger = null;
    this._offlineMode = (process.env.IS_OFFLINE || process.env.IS_LOCAL);

    this.fileTransport = new winston.transports.DailyRotateFile(custom.transportsOpt.file);
    this.consoleTransport = this._offlineMode
      ? new winston.transports.Console(custom.transportsOpt.offlineConsole)
      : new winston.transports.Console(custom.transportsOpt.onlineConsole);
  }

  static forceOfflineMode() {
    session = this._getInstance();
    session._offlineMode = true;
    return this;
  }

  static _getInstance() {
    if (!session) {
      session = new SessionLogger();
    }
    return session;
  }

  // static resetContext() {
  //   console.log('force reset');
  //   session = this._getInstance();
  //   console.log(session._context);

  //   session._context = initContext();
  //   console.log(session._context);
  // }

  static addContext(context, overwrite = false) {
    session = this._getInstance();
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
    session = this._getInstance();

    if (!winston.loggers.has(label)) {
      winston.loggers.add(label, {
        defaultMeta: {
          _context: session._context,
        },
        levels: custom.levels, // winston.config.syslog.levels,
        exitOnError: false,
        level: custom.levels[session._level] ? session._level : 'debug',
        transports: session._offlineMode
          ? [session.consoleTransport, session.fileTransport]
          : [session.consoleTransport],
        format: winston.format.label({ label }),
        exceptionHandlers: [session.consoleTransport],
      });
    }
    session._currentLabel = label;
    session._currentLogger = winston.loggers.get(label);
    return session._currentLogger;
  }
}

module.exports = SessionLogger;
