const logger = require('../index');

logger.setLabel('2');

logger.info('into test 1');
logger.debug('debug message');
logger.warn('warning message');
logger.error('error message');
logger.crit('crit message');
logger.alert('alert message');
logger.panic('emerg message');
