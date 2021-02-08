const logger = require('../index');

logger.setLabel('1');

logger.debug('debug message');
logger.trace('into test 1');
logger.info('into test 1');
logger.warn('warning message');
logger.error('error message', { error: 'ERROR HERE' });
logger.crit('crit message');
logger.alert('alert message');
logger.panic('emerg message');
