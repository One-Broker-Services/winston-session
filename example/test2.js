const LogSession = require('../index');

const logger = new LogSession();
logger.startSegment('TEST1');

logger.info('into test 1');
logger.debug('debug message');
logger.warn('warning message');
logger.error('error message');
logger.alert('alert message');
logger.panic('emerg message');

logger.footprint('some important checkpoint data', { data: { a: 'qwert' } });
