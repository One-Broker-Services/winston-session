/* eslint-disable no-underscore-dangle */
const Session = require('./LogSession');
const Loggers = require('./Loggers');

let instance = null;

class LogService {
  constructor() {
    this._currentLabel = null;
    this._currentGroup = 'APP';
    this._loggers = new Loggers(this._currentGroup);
    this._session = new Session();
  }

  // get session() {
  //   return this._session;
  // }

  // show() {
  //   console.log(this);
  // }

  static _getInstance() {
    if (!instance) {
      instance = new LogService();
    }
    return instance;
  }

  static setLabel(label) {
    const service = this._getInstance();
    service._currentLabel = label;
    return this;
  }

  static setGroup(group) {
    const service = this._getInstance();
    service._currentGroup = group;
    return this;
  }

  static addContext(context) {
    const service = this._getInstance();
    service._session.updateContext(context, true);
    return this;
  }

  static getLogger() {
    const service = this._getInstance();
    return service._loggers.get(service.group);
  }

  static _performAction(action, msg, data) {
    const service = this._getInstance();

    // this.show();
    const currentLogger = this.getLogger();
    const meta = {
      data,
      context: service._session.context,
      tag: service._currentLabel
        ? `${service._currentGroup}:${service._currentLabel}`
        : `${service._currentGroup}`,
    };
    currentLogger[action](msg, meta);
  }

  // log methods
  static debug(msg, meta) {
    this._performAction('debug', msg, meta);
  }

  static trace(msg, meta) {
    this._performAction('trace', msg, meta);
  }

  static info(msg, meta) {
    this._performAction('info', msg, meta);
  }

  static warn(msg, meta) {
    this._performAction('warn', msg, meta);
  }

  static error(msg, meta) {
    this._performAction('error', msg, meta);
  }

  static crit(msg, meta) {
    this._performAction('crit', msg, meta);
  }

  static alert(msg, meta) {
    this._performAction('alert', msg, meta);
  }

  static panic(msg, meta) {
    this._performAction('panic', msg, meta);
  }
}


module.exports = LogService;
