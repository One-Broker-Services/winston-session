/* eslint-disable no-underscore-dangle */
const Session = require('./LogSession');
const Loggers = require('./Loggers');

let instance = null;

class LogService {
  constructor() {
    this._currentLabel = null;
    this._currentGroup = 'APP';
    this.loggers = new Loggers(this._currentGroup);
    this._session = new Session();
  }

  // get session() {
  //   return this._session;
  // }

  show() {
    console.log(this);
  }

  static getInstance() {
    if (!instance) {
      instance = new LogService();
    }
    return instance;
  }

  setLabel(label) {
    this._currentLabel = label;
    return this;
  }

  setGroup(group) {
    this._currentGroup = group;
    return this;
  }

  addContext(context) {
    this._session.updateContext(context, true);
  }

  _performAction(action, msg, data) {
    // this.show();
    const currentLogger = this.loggers.get(this.group);
    const meta = {
      data,
      context: this._session.context,
      tag: this._currentLabel ? `${this._currentGroup}:${this._currentLabel}` : `${this._currentGroup}`,
    };
    currentLogger[action](msg, meta);
  }

  // log methods
  debug(msg, meta) {
    this._performAction('debug', msg, meta);
  }

  trace(msg, meta) {
    this._performAction('trace', msg, meta);
  }

  info(msg, meta) {
    this._performAction('info', msg, meta);
  }

  warn(msg, meta) {
    this._performAction('warn', msg, meta);
  }

  error(msg, meta) {
    this._performAction('error', msg, meta);
  }

  crit(msg, meta) {
    this._performAction('crit', msg, meta);
  }

  alert(msg, meta) {
    this._performAction('alert', msg, meta);
  }

  panic(msg, meta) {
    this._performAction('panic', msg, meta);
  }
}


module.exports = LogService;
