const { Logger } = require('../index');

const generic = Logger.getLogger();
generic.info('log some stuff w/ generic logger');


const logger = Logger.getLogger('TEST:PROXY');

logger.info('start tests');
logger.debug('loading test 1 from proxy');
require('./test1');

logger.debug('loading test 2 from proxy');
require('./test2');


console.log(Logger);
