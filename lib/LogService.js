/* eslint-disable no-underscore-dangle */
// is a singleton. only one log service instance must exist in a session
/**
 * Note: Usually the module pattern which is not the singleton pattern is good enough.
 * However, one of the features of the singleton is that its initialization is delayed
 * till the object is needed. The module pattern lacks this feature.
 */
const winston = require('winston');
const custom = require('./config');

let instance = null;
class LogService {
  constructor(options = {}) {
    this._winston = winston;

    if (options.colors && options.levels) {
      this._colors = options.colors || custom.colors;
      this._levels = options.levels || custom.levels;
    } else {
      this._colors = custom.colors;
      this._levels = custom.levels;
    }
    this._winston.addColors(this._colors);
  }

  static getWinston() {
    return instance._winston;
  }

  static getLogger(id, options) {
    options.levels = instance._levels;
    if (!instance._winston.loggers.has(id)) {
      // console.log(`**********CREATING NEW LOGGER ${id}.levels ${options.levels}`);
      instance._winston.loggers.add(id, options);
    }
    return instance._winston.loggers.get(id);
  }

  // config with replacement <- TODO: investigate this
  static configLogger(id, options) {
    if (instance._winston.loggers.has(id)) {
      // console.log(`**********CLOSING LOGGER ${id}.levels ${options.levels}`);
      instance._winston.loggers.close(id);
    }
    return this.getLogger(id, options);
  }

  static instance() {
    if (!instance) {
      instance = new LogService();
      // Object.freeze(instance); // TODO: investigate this
    } return instance;
  }
}

module.exports = LogService;
