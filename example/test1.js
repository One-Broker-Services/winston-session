const LogSession = require('../index');

const logger = new LogSession();
logger.startSegment('TEST1');

logger.debug('debug message');
logger.trace('into test 1');
logger.info('into test 1');
logger.warn('warning message');
logger.error('error message', { error: 'ERROR HERE' });
logger.footprint('some important checkpoint data', { data: { a: 'qwert' } });
logger.alert('alert message');
logger.panic('emerg message');
