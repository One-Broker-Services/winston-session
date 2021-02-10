// is a singleton. only one log service instance must exist in a session

let instance = null;
class LogService {
  // constructor() {
  // }

  static instance() {
    if (!instance) {
      instance = new LogService();
    } return instance;
  }
}

module.exports = LogService;
