/* eslint-disable no-underscore-dangle */
const winston = require('winston');
require('winston-daily-rotate-file');

function logFormatTemplate(info) {
  return `${info.level} [${info.tag}] ${info.message}`;
}

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
    panic: 0,
    alert: 1,
    error: 2,
    footprint: 3,
    warn: 4,
    info: 5,
    trace: 6,
    debug: 7,
  },
  colors: {
    panic: 'yellow redBG',
    alert: 'black redBG',
    error: 'red',
    footprint: 'bold black cyanBG',
    warn: 'yellow',
    info: 'green',
    trace: 'green',
    debug: 'green',
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


class LoggerCollection {
  constructor(label = 'GENERIC') {
    winston.addColors(custom.colors);
    this._level = process.env.LOG_LEVEL || 'debug';
    this._offlineMode = (process.env.IS_OFFLINE || process.env.IS_LOCAL);
    this.fileTransport = new winston.transports.DailyRotateFile(custom.transportsOpt.file);
    this.consoleTransport = this._offlineMode
      ? new winston.transports.Console(custom.transportsOpt.offlineConsole)
      : new winston.transports.Console(custom.transportsOpt.onlineConsole);

    winston.loggers.add(label, {
      // defaultMeta: {},
      levels: custom.levels, // winston.config.syslog.levels,
      exitOnError: false,
      level: custom.levels[this._level] ? this._level : 'debug',
      transports: this._offlineMode
        ? [this.consoleTransport, this.fileTransport]
        : [this.consoleTransport],
      format: winston.format.label({ label }),
      exceptionHandlers: [this.consoleTransport],
    });
  }

  get(label) {
    if (!winston.loggers.has(label)) {
      winston.loggers.add(label, {
        levels: custom.levels, // winston.config.syslog.levels,
        exitOnError: false,
        level: custom.levels[this._level] ? this._level : 'debug',
        transports: this._offlineMode
          ? [this.consoleTransport, this.fileTransport]
          : [this.consoleTransport],
        format: winston.format.label({ label }),
        exceptionHandlers: [this.consoleTransport],
      });
    }

    return winston.loggers.get(label);
  }
}


module.exports = LoggerCollection;
