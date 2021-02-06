const LogSession = require('../index');

const generic = LogSession
  .addContext({ generic: 'qwrty' })
  .getLogger();
generic.info('log some stuff w/ generic logger');

const logger = LogSession.getLogger('TEST:PROXY');

logger.info('start tests');
logger.debug('add context for test1');
LogSession.addContext({ level1Time: 'level1Time' });
logger.debug('loading test 1 from proxy');
require('./test1');

logger.debug('add context for test2');
LogSession.addContext({ level2Time: 'level2Time' });
logger.debug('loading test 2 from proxy');
require('./test2');
