
// is a singleton. only one context instance must exist in a session
let instance = null;
class LogContext {
  constructor() {
    this.global = {};
  }

  static instance() {
    if (!instance) {
      instance = new LogContext();
    } return instance;
  }
}

module.exports = LogContext;
