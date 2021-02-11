/* eslint-disable no-underscore-dangle */
const winston = require('winston');
const Service = require('./LogService');
const custom = require('./config');

class LogService {
  constructor(level) {
    this.start(level);
  }

  start(level = 'debug') {
    this._level = level;
    this._winstonService = winston;
    this._service = Service.instance();
    this._paused = false;
    this._offlineMode = (process.env.IS_OFFLINE || process.env.IS_LOCAL);
  }

  pause() {
    this._paused = true;
  }

  get winston() {
    return this._service.getWinston();
  }

  set level(lv) {
    this.level = lv;
  }

  get level() {
    return this.lv;
  }

  addLogger(id = 'DEFAULT_LOGGER', options = {}) {
    // console.log(`===GET LOGGER: ${id}`);
    // console.log(winston.loggers);
    options.levels = custom.levels;
    options.exitOnError = false;
    options.format = winston.format.label({ label: id });

    options.level = custom.levels[options.level] ? options.level : 'debug';

    const defaultTransport = this._offlineMode
      ? new winston.transports.Console(custom.transportsOpt.offlineConsole)
      : new winston.transports.Console(custom.transportsOpt.onlineConsole);
    options.transports = options.transports || [defaultTransport];
    options.exceptionHandlers = options.exceptionHandlers || [defaultTransport];

    const logger = Service.getLogger(id, options);
    return logger;
  }

  // TODO: actually not keep base logger options of exist (are replaced by new options or default options)
  configLogger(id = 'DEFAULT_LOGGER', options = {}) {
    // console.log(`===CONFIG LOGGER: ${id}`);
    // console.log(winston.loggers);
    options.levels = custom.levels;
    options.exitOnError = false;
    options.format = winston.format.label({ label: id });

    options.level = custom.levels[options.level] ? options.level : 'debug';

    const defaultTransport = this._offlineMode
      ? new winston.transports.Console(custom.transportsOpt.offlineConsole)
      : new winston.transports.Console(custom.transportsOpt.onlineConsole);
    options.transports = options.transports || [defaultTransport];
    options.exceptionHandlers = options.exceptionHandlers || [defaultTransport];

    const logger = Service.configLogger(id, options);
    return logger;
  }

  log(loggerId, level, msg, ...meta) {
    if (!this._paused) {
      const logger = this.logger(loggerId);
      logger.log(level, msg, ...meta);
    }
  }
}

module.exports = LogService;
