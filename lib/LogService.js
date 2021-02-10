// is a singleton. only one log service instance must exist in a session
/**
 * Note: Usually the module pattern which is not the singleton pattern is good enough.
 * However, one of the features of the singleton is that its initialization is delayed
 * till the object is needed. The module pattern lacks this feature.
 */

let instance = null;
class LogService {
  // constructor() {
  // }

  static instance() {
    if (!instance) {
      instance = new LogService();
      // Object.freeze(instance); // TODO: investigate this
    } return instance;
  }
}

module.exports = LogService;
