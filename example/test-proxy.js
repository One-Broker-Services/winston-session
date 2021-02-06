const { LogSession } = require('../index');

const generic = LogSession.getLogger();
generic.info('log some stuff w/ generic logger');


const logger = LogSession.getLogger('TEST:PROXY');

logger.info('start tests');
logger.debug('loading test 1 from proxy');
require('./test1');

logger.debug('loading test 2 from proxy');
require('./test2');


console.log(LogSession);
