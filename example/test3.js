const logger = require('../index');

logger.debug('qwertyu');
logger.trace('qwertyu');
logger.info('qwertyu');

logger.setLabel('RED_ZONE');
logger.session.updateContext({ a: '111111111111' });

logger.warn('qwertyu');
logger.error('qwertyu');
logger.session.updateContext({ b: '111111111111' });

logger.info('qwertyu');
logger.info('qwertyu');
