const SessionLogger = require('../index');

const logger = SessionLogger.getLogger('TEST:1');

logger.info('into test 1');
logger.debug('debug message');
logger.warning('warning message');
logger.error('error message', { error: 'ERROR HERE' });
logger.crit('crit message');
logger.alert('alert message');
logger.emerg('emerg message');
