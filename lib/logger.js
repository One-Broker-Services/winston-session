/* eslint-disable no-underscore-dangle */
/**
 * see: https://www.freecodecamp.org/news/how-to-add-typescript-to-a-javascript-project/
 *
 */
const winston = require('winston');
require('winston-daily-rotate-file');
const uuid = require('uuid');

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
    this._context = initContext();

    winston.addColors(custom.colors);

    this._level = process.env.LOG_LEVEL || 'debug';
    this._offlineMode = (process.env.IS_OFFLINE || process.env.IS_LOCAL);
    this.fileTransport = new winston.transports.DailyRotateFile(custom.transportsOpt.file);
    this.consoleTransport = this._offlineMode
      ? new winston.transports.Console(custom.transportsOpt.offlineConsole)
      : new winston.transports.Console(custom.transportsOpt.onlineConsole);

    winston.loggers.add('GENERIC', {
      defaultMeta: {
        _context: this._context,
      },
      levels: custom.levels, // winston.config.syslog.levels,
      exitOnError: false,
      level: custom.levels[this._level] ? this._level : 'debug',
      transports: this._offlineMode
        ? [this.consoleTransport, this.fileTransport]
        : [this.consoleTransport],
      format: winston.format.label({ label: 'GENERIC' }),
      exceptionHandlers: [this.consoleTransport],
    });
    this._currentLabel = 'GENERIC';
    this._currentLogger = winston.loggers.get(this._currentLabel);
  }

  static debug(msg, meta) {
    session = this._getInstance();
    session._currentLogger.debug(msg, { data: meta });
  }

  static info(msg, meta) {
    session = this._getInstance();
    session._currentLogger.info(msg, { data: meta });
  }

  static verbose(msg, meta) {
    session = this._getInstance();
    session._currentLogger.verbose(msg, { data: meta });
  }

  static warning(msg, meta) {
    session = this._getInstance();
    session._currentLogger.warning(msg, { data: meta });
  }

  static error(msg, meta) {
    session = this._getInstance();
    session._currentLogger.error(msg, { data: meta });
  }

  static crit(msg, meta) {
    session = this._getInstance();
    session._currentLogger.crit(msg, { data: meta });
  }

  static alert(msg, meta) {
    session = this._getInstance();
    session._currentLogger.alert(msg, { data: meta });
  }

  static emerg(msg, meta) {
    session = this._getInstance();
    session._currentLogger.emerg(msg, { data: meta });
  }


  static forceOfflineMode() {
    session = this._getInstance();
    session._offlineMode = true;
    return this;
  }

  static _addLogger(label) {
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
    if (session && session._currentLabel) {
      const currentLogger = winston.loggers.get(session._currentLabel);
      currentLogger.defaultMeta._context = session._context;
      session._currentLogger = currentLogger;
    }
    return this;
  }

  static getLogger(label = 'GENERIC') {
    session = this._getInstance();

    if (!winston.loggers.has(label)) {
      this._addLogger(label);
    }
    session._currentLabel = label;
    session._currentLogger = winston.loggers.get(label);
    return session._currentLogger;
  }
}

module.exports = SessionLogger;
