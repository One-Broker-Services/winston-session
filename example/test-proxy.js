const LogSession = require('../index');

const logger = new LogSession();

logger.info('log some stuff w/ generic logger');
logger.addContext({ generic: 'qwrty' });
logger.info('log some stuff w/ generic logger');
logger.setGroup('TEST').setLabel('PROXY');

logger.info('start tests');
logger.debug('add context for test1');
logger.addContext({ level1Time: 'level1Time' });
logger.debug('loading test 1 from proxy');
require('./test1');

logger.debug('add context for test2');
logger.addContext({ level2Time: 'level2Time' });
logger.debug('loading test 2 from proxy');
require('./test2');


logger.info('proxy finish');
