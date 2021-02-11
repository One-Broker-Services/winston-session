const uuid = require('uuid').v4;

// is a singleton. only one context instance must exist in a session
let instance = null;
class MDC {
  constructor() {
    this.global = {
      _globalContextId: uuid(),
    };
  }

  static instance() {
    if (!instance) {
      instance = new MDC();
      // Object.freeze(instance); // TODO: investigate this
    } return instance;
  }

  static clear() {
    if (instance) {
      instance.global = {
        _globalContextId: uuid(),
      };
    }
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

module.exports = MDC;
