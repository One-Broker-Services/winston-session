/* eslint-disable no-underscore-dangle */
const ServiceManager = require('./LogServiceManager');
const ContextManager = require('./LogContextManager');

const makeTag = (session) => {
  let tag = `${session._name}:${session._loggerId}`;
  if (session._group) tag += `:${session._group}`;
  if (session._label) tag += `:${session._label}`;
  return tag;
};
class LogSession {
  constructor(sessionName) {
    this._name = sessionName || 'APP';
    this._loggerId = 'DEFAULT';
    this._group = null;
    this._label = null;
    this._level = process.env.LOG_LEVEL;
    this._context = new ContextManager();
    this._service = new ServiceManager(this._level);
    this._logger = this._service.logger(this._loggerId);
  }

  // get winston() {
  //   return this._service.winston;
  // }

  // get logger() {
  //   return this._logger;
  // }

  // set logger(id) {
  //   this._logger = this._service.logger(id);
  //   return this;
  // }

  // get context() {
  //   return this.context;
  // }

  // set context(ctx) {
  //   const _this = this;
  //   return {
  //     global: () => {
  //       _this._context.update(ctx);
  //       return _this;
  //     },
  //     local: () => {
  //       const a = '';
  //       return _this;
  //     },
  //   };
  // }

  // addContext(ctx) {

  // }

  // applyContext(id) {
  //   const context = this.context.get(id);
  //   return this;
  // }
  // log methods

  setLabel(label) {
    this._label = label;
    return this;
  }

  setGroup(group) {
    this._group = group;
    return this;
  }

  getLogger() {
    return this._logger;
  }

  addContext(ctx) {
    const contextId = makeTag(this);
    this._context.update(ctx, contextId);
  }

  log(action, msg, data) {
    // this.show();
    const currentLogger = this.getLogger();
    const contextId = makeTag(this);
    const currentContext = this._context.get(contextId);
    const meta = {
      data,
      context: currentContext,
      tag: contextId,
    };
    currentLogger[action](msg, meta);
  }

  debug(msg, meta) {
    this.log('debug', msg, meta);
  }

  trace(msg, meta) {
    this.log('trace', msg, meta);
  }

  info(msg, meta) {
    this.log('info', msg, meta);
  }

  warn(msg, meta) {
    this.log('warn', msg, meta);
  }

  error(msg, meta) {
    this.log('error', msg, meta);
  }

  alert(msg, meta) {
    this.log('alert', msg, meta);
  }

  panic(msg, meta) {
    this.log('panic', msg, meta);
  }

  footprint(msg, meta) {
    this.log('footprint', msg, meta);
  }
}

module.exports = LogSession;

// const session = new LogSession();
