# Description

A custom winston-based logger container, with session context management. Context is shared by all active loggers and can be dynamically enriched during the session

## Motivation

## Higligths

* la session es una instancia unica que mantiene sus propiedades persistentes entre todos los ficheros una. Es ideal para los entornos serverless en los que cada llamada a la api es independiente (p.e una lambda unica)
* permite mantener un contexto compartido por todos los loggers de la session. este contexto se puede ir enriqueciendo durante la sesion en cualquier fu
* permite matener simultaneamente varios loggers independientes en una misma session.
Los un logger queda definido  por un label especifico.

## Installation

```bash
npm i @one-broker-services/winston-session
```

## Enviroment variables

|env|required|description|
|:--:|:--:|:--:|
|IS_LOCAL|no|if set Logger run in offline mode|
|IS_OFFLINE|no|if set Logger run in offline mode|
|LOG_LEVEL|no|define max log level for Logger|

## Log Levels

```json
{
  emerg: 0, //
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  info: 5,
  verbose: 6,
  debug: 7,
}
```

## Use

```javascript
const SessionLogger = require('@one-broker-services/winston-session');
const logger = SessionLogger.getLogger('TEST:1');

SessionLogger.addContext(somePersistentContext)

logger.emerg('some message', someoOptionalMeta)
logger.alert('some message', someoOptionalMeta)
logger.crit('some message', someoOptionalMeta)

SessionLogger.addContext(morePersistentContext)

logger.error('some message', someoOptionalMeta)
logger.warning('some message', someoOptionalMeta)
logger.info('some message', someoOptionalMeta)
logger.debug('some message', someoOptionalMeta)

```

## Example

```javascript
//file1.js
const SessionLogger = require('@one-broker-services/winston-session');

const logger = SessionLogger.getLogger('TEST:1');

logger.debug('debug message');
logger.verbose('into test 1');
logger.info('into test 1');
logger.warning('warning message');
logger.error('error message', { error: 'ERROR HERE' });
logger.crit('crit message');
logger.alert('alert message');
logger.emerg('emerg message');


```

```javascript
//file2.js
const SessionLogger = require('@one-broker-services/winston-session');

const logger = SessionLogger.getLogger('TEST:2');

logger.info('into test 1');
logger.debug('debug message');
logger.warning('warning message');
logger.error('error message');
logger.crit('crit message');
logger.alert('alert message');
logger.emerg('emerg message');

```

```javascript
//proxy.js
const SessionLogger = require('@one-broker-services/winston-session');

const generic = SessionLogger
  .addContext({ generic: 'any' }
  .getLogger();
generic.info('log some stuff w/ generic logger');

const logger = SessionLogger.getLogger('TEST:PROXY');

logger.info('start tests');
logger.debug('add context for test1');
SessionLogger.addContext({ level1Time: 'level1Time' });
logger.debug('loading test 1 from proxy');
require('./test1');

logger.debug('add context for test2');
SessionLogger.addContext({ level2Time: 'level2Time' });
logger.debug('loading test 2 from proxy');
require('./test2');
```
