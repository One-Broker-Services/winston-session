const { Logger } = require('../index');

const logger = Logger.getLogger('TEST:1');

logger.info('into test 1');
logger.debug('debug message');
logger.warning('warning message');
logger.error('error message');
logger.crit('crit message');
logger.alert('alert message');
logger.emerg('emerg message');
