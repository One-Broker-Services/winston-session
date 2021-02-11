/* eslint-disable no-underscore-dangle */
const uuid = require('uuid').v4;
const winston = require('winston');
const Service = require('./LogService');
const custom = require('./config');

const customFileTransport = new winston.transports.DailyRotateFile(custom.transportsOpt.file);
const customConsoleTransport = (process.env.IS_OFFLINE || process.env.IS_LOCAL) /* this._offlineMode */
  ? new winston.transports.Console(custom.transportsOpt.offlineConsole)
  : new winston.transports.Console(custom.transportsOpt.onlineConsole);
// const customConsoleTransport = new winston.transports.Console(custom.transportsOpt.offlineConsole);

const getDefaultLoggerOptions = (level, offlineMode = false) => ({
  levels: custom.levels, // winston.config.syslog.levels,
  exitOnError: false,
  level: custom.levels[level] ? level : 'debug',
  transports: offlineMode
    ? [customConsoleTransport]
    : [customConsoleTransport],
  format: winston.format.label({ label: 'GENERIC' }),
  exceptionHandlers: [customConsoleTransport],
});

class LogService {
  constructor(level) {
    this.start(level);
  }

  start(level = 'debug') {
    this._level = level;
    this._winstonService = winston;
    this._service = Service.instance();
    this._service.loggers = winston.loggers;
    winston.addColors(custom.colors);
    this._paused = false;
    this._offlineMode = (process.env.IS_OFFLINE || process.env.IS_LOCAL);
    this._defaultLoggerOpt = getDefaultLoggerOptions(this._level, this._offlineMode);
  }

  pause() {
    this._paused = true;
  }

  get winston() {
    return this._winstonService;
  }

  get loggers() {
    return this._service.loggers;
  }

  set level(lv) {
    this.level = lv;
  }

  get level() {
    return this.lv;
  }

  logger(id = 'GENERIC', options = this._defaultLoggerOpt) {
    if (!this.loggers.has(id)) {
      this.loggers.add(id, options);
    }
    return this.loggers.get(id);
  }

  log(loggerId, level, msg, ...meta) {
    if (!this._paused) {
      const logger = this.logger(loggerId);
      logger.log(level, msg, ...meta);
    }
  }
}

module.exports = LogService;
