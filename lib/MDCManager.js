/* eslint-disable no-underscore-dangle */
const uuid = require('uuid').v4;
const MDC = require('./MDC');
const { merge } = require('./util');

class MDCManager {
  constructor() {
    this._mdc = MDC.instance();
  }

  _getGlobal() {
    return this._mdc.global;
  }

  _getLocal(id = uuid()) {
    if (!this._mdc[id]) {
      this._mdc[id] = {};
    }
    this._mdc[id]._localContextId = id;
    return this._mdc[id];
  }

  _clearLocal(id) {
    delete this._mdc[id];
  }

  _clear() {
    this._mdc = MDCManager.clear();
  }

  _putGlobal(data) {
    const id = this._mdc.global._globalContextId;
    this._mdc.global = merge(this._getGlobal(), data);
    this._mdc.global._globalContextId = id; // make sure we're keeping context Id
  }

  _putLocal(data, id) {
    this._mdc[id] = this._getLocal(id);
    this._mdc[id] = merge(this._mdc[id], data);
    this._mdc[id]._localContextId = id; // make sure we're keeping context Id
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

  clear(id) {
    if (id) this._clearLocal(id);
    else this._clear();
    return this.get(id);
  }

  put(data, id) {
    if (!id) this._putGlobal(data);
    else this._putLocal(data, id);
    return this.get(id);
  }
}

module.exports = MDCManager;
