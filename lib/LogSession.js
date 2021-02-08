/* eslint-disable no-underscore-dangle */
const uuid = require('uuid').v4;

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const resetContext = (session) => {
  session.context = {
    sessionId: uuid(),
  };
};

class LogSession {
  constructor() {
    resetContext(this);
  }

  updateContext(context, overwrite = false) {
    if (overwrite) {
      const newContext = {
        ...clone(this.context),
        ...clone(context),
      };
      this.context = newContext;
    } else {
      const newContext = {
        ...clone(context),
        ...clone(this.context),
      };
      newContext.sessionId = this.context.sessionId; // for security, make sure we're keeping sessionId
      this.context = newContext;
    }
    return this;
  }

  resetContext() {
    resetContext(this);
  }
}

module.exports = LogSession;
