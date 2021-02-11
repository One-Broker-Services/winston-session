const LogSession = require('../index');

const logSession = new LogSession();
logSession.startSegment('TEST1');

logSession.debug('debug message');
logSession.trace('into test 1');
logSession.info('into test 1');
logSession.warn('warning message');
logSession.error('error message', { error: 'ERROR HERE' });
logSession.backup('some important checkpoint data', { data: { a: 'qwert' } });
logSession.alert('alert message');
logSession.panic('emerg message');
