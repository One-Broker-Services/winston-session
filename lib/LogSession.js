/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const ServiceManager = require('./LogServiceManager');
const ContextManager = require('./LogContextManager');
const { merge } = require('./util');
const { levels } = require('./config');


const makeSegmentToken = (session) => {
  let tag = `${session._name}`;
  if (session._segment) tag += `:${session._segment}`;
  if (session._group) tag += `:${session._group}`;
  if (session._label) tag += `:${session._label}`;
  return tag;
};

const compareLevels = (l1, l2) => {
  if (levels[l1] === levels[l2]) return 0;
  return levels[l1] > levels[l2] ? 1 : -1;
};
// TODO: add sessionSegment managemet (maybe this deprecate group-label mechanism)
class LogSession {
  constructor(opt = {}) {
    this._name = opt.name || 'APP';
    this._contextLevel = levels[process.env.LOG_CTX_LEVEL] ? process.env.LOG_CTX_LEVEL : 'debug';
    this._segment = null;
    this._loggerId = 'DEFAULT';
    this._group = null;
    this._label = null;
    this._level = levels[process.env.LOG_LEVEL] ? process.env.LOG_LEVEL : 'debug';
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
  getLogger() {
    return this._logger;
  }

  setLabel(label) {
    this._label = label;
    return this;
  }

  startSegment(segment) {
    this._segment = segment;
    this.endGroup();
    return this;
  }

  endSegment() {
    this._segment = null;
    this.endGroup();
  }

  startGroup(group) {
    if (this._segment) this._group = group;
    this._segment = group;
    return this;
  }

  endGroup() {
    this._group = null;
    return this;
  }

  addContextSegment(ctx) {
    const segmentToken = makeSegmentToken(this);
    this._context.update(ctx, segmentToken);
  }

  addContext(ctx) {
    this._context.update(ctx);
  }

  log(action, msg, data) {
    // this.show();
    const currentLogger = this.getLogger();
    const segmentToken = makeSegmentToken(this);
    const contextId = this._context.id;

    const meta = {
      _meta: data,
      _context: { _id: contextId },
      _segmentId: segmentToken,
      _timestamp: moment().unix(),
    };

    const attachContext = compareLevels(action, this._contextLevel) < 0;
    if (attachContext) {
      const currentContext = this._context.get(segmentToken);
      // preserve global context (same key in local context must be ignored)
      const mergedContext = merge(currentContext.global, currentContext.local);
      // const contextId = mergedContext._globalContextId; // this._context.id;

      // clean context
      delete mergedContext._localContextId;
      delete mergedContext._globalContextId;

      // add id
      mergedContext._id = contextId;
      meta._context = mergedContext;
    }
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
