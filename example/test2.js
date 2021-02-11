const LogSession = require('../index');

const logSession = new LogSession();
logSession.startSegment('TEST1');

logSession.info('into test 1');
logSession.debug('debug message');
logSession.warn('warning message');
logSession.error('error message');
logSession.alert('alert message');
logSession.panic('emerg message');

logSession.backup('some important checkpoint data', { data: { a: 'qwert' } });
