const logger = require('../index');

logger.debug('qwertyu');
logger.trace('qwertyu');
logger.info('qwertyu');

logger.addContext({ a: '111111111111' });

logger.warn('qwertyu');
logger.error('qwertyu');
logger.addContext({ b: '111111111111' });

logger.info('qwertyu');
logger.info('qwertyu');
