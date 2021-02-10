/* eslint-disable no-underscore-dangle */
const uuid = require('uuid').v4;
const Context = require('./LogContext');
const { merge } = require('./util');

class ContextManager {
  constructor() {
    this._context = Context.instance();
  }

  _getGlobal() {
    return this._context.global;
  }

  _getLocal(id = uuid()) {
    if (!this._context[id]) {
      this._context[id] = {};
    }
    this._context[id]._localContextId = id;
    return this._context[id];
  }

  _resetLocal(id) {
    delete this._context[id];
  }

  _reset() {
    this._context = Context.reset();
  }

  _updateGlobal(data) {
    const id = this._context.global._globalContextId;
    this._context.global = merge(this._getGlobal(), data);
    this._context.global._globalContextId = id; // make sure we're keeping context Id
  }

  _updateLocal(data, id) {
    this._context[id] = this._getLocal(id);
    this._context[id] = merge(this._context[id], data);
    this._context[id]._localContextId = id; // make sure we're keeping context Id
  }

  get id() {
    return this._getGlobal()._globalContextId;
  }

  get(id) {
    const ctx = {
      global: this._getGlobal(),
      local: this._getLocal(id),
    };
    // console.log('=======[CTX]=======\n', ctx);
    return ctx;
  }

  reset(id) {
    if (id) this._resetLocal(id);
    else this._reset();
    return this.get(id);
  }

  update(data, id) {
    if (!id) this._updateGlobal(data);
    else this._updateLocal(data, id);
    return this.get(id);
  }
}

module.exports = ContextManager;


// const contextManager = new ContextManager();

// const { inspect } = require('util');

// contextManager.update({ n: 12345 }, 'APP');
// const c = contextManager.get('APP');
// const c = contextManager.update({ a: { b: { c: 'd' } } }, 'APP');

// console.log(inspect(c, { depth: 10, colors: true }));

// contextManager.update({ a: { b: { c: 'd' } } });
// console.log(inspect(contextManager, { depth: 10, colors: true }));

// contextManager.update({ a: { b: { c: 'd' } } }, 'FILE1');
// console.log(inspect(contextManager, { depth: 10, colors: true }));


// contextManager.get('FILE2');
// console.log(inspect(contextManager, { depth: 10, colors: true }));
