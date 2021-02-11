const LogSession = require('../index');

const logger = new LogSession();

logger.info('log some stuff in generic segment');

logger.startSegment('ENTRY_POINT');

logger.info('hello im now in entry point');

logger.startGroup('AUTH');
logger.debug('add local context');
logger.mdcSegment.put({ authInfo: 'this is a local context info for session: ENTRY_POINT:AUTH' });

// .....

logger.info('try to autenticate user');
logger.mdc.put({ endpoint: '/example', username: 'user', role: 'admin' });
logger.info('auth success');

logger.startGroup('LOAD_ROUTES');

logger.info('loading...');
logger.debug('add local context');
logger.mdcSegment.put({ level1Time: 'level1Time' });
logger.debug('loading test 1 from proxy');
require('./test1');

logger.debug('add context for test2');
logger.mdcSegment.put({ level2Time: 'level2Time' });
logger.debug('loading test 2 from proxy');
require('./test2');

logger.info('proxy finish');
