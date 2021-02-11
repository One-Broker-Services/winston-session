const winston = require('winston');
const LogSession = require('../index');

const loggerOptions = {
  level: 'debug',
  transports: [new winston.transports.Console({
    handleExceptions: true,
    level: 'error',
    format: winston.format.combine(
      winston.format.colorize(), // winston.format.cli(),
      winston.format.printf((info) => `${info.level} ${info.message}`),
    ),
  })],
};

const logSession = new LogSession();

logSession.globalConfig(loggerOptions);

logSession.info('log some stuff in generic segment');

logSession.startSegment('ENTRY_POINT');

logSession.info('hello im now in entry point');

logSession.startGroup('AUTH');
logSession.debug('add local context');
logSession.mdcSegment.put({ authInfo: 'this is a local context info for session: ENTRY_POINT:AUTH' });

// .....

logSession.info('try to autenticate user');
logSession.mdc.put({ endpoint: '/example', username: 'user', role: 'admin' });
logSession.info('auth success');

logSession.startGroup('LOAD_ROUTES');

logSession.info('loading...');
logSession.debug('add local context');
logSession.mdcSegment.put({ level1Time: 'level1Time' });
logSession.debug('loading test 1 from proxy');
require('./test1');

logSession.debug('add context for test2');
logSession.mdcSegment.put({ level2Time: 'level2Time' });
logSession.debug('loading test 2 from proxy');
require('./test2');

logSession.info('proxy finish');
