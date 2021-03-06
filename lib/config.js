/* eslint-disable no-underscore-dangle */
const winston = require('winston');
require('winston-daily-rotate-file');
const { inspect } = require('util');

function logFormatTemplate(info) {
  const contextId = info._context ? info._context._id : undefined;
  //  const uname = info._context.username
  return `${contextId} ${info.level} [${info._segmentId}] ${info.message}`;

  // return `${contextId} ${info.level} [${info._segmentId}] ${info.message} \n ${inspect(info._context, { depth: 10, colors: true })}`;
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
const config = {
  levels: {
    backup: 0,
    panic: 1,
    alert: 2,
    error: 3,
    warn: 4,
    info: 5,
    trace: 6,
    debug: 7,
  },
  colors: {
    backup: 'bold white cyanBG',
    panic: 'yellow redBG',
    alert: 'black redBG',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    trace: 'green',
    debug: 'green',
  },
  transportsOpt: {
    default: {
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.json(),
      ),
    },
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

module.exports = config;
