
// is a singleton. only one context instance must exist in a session
let instance = null;
class LogContext {
  constructor() {
    this.global = {};
  }

  static instance() {
    if (!instance) {
      instance = new LogContext();
      // Object.freeze(instance); // TODO: investigate this
    } return instance;
  }
}

// class LogContext {
//   constructor() {
//     if (LogContext._instance) {
//       return LogContext._instance;
//     }
//     LogContext._instance = this;

//     // ... Your rest of the constructor code goes after this
//   }
// }

module.exports = LogContext;
