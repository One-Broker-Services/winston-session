# Description

A custom winston-based logger container, with session context management. Context is shared by all active loggers and can be dynamically enriched during the session

# Disclaimer

This is a work in progress, current versions are still unstable, so breaking changes may come in the near future

Any comment, suggestions or contributions are welcome.
<destevezbreso@gmail.com>

## Motivation

## Higligths

<!-- * la session es una instancia unica que mantiene sus propiedades persistentes entre todos los ficheros una. Es ideal para los entornos serverless en los que cada llamada a la api es independiente (p.e una lambda unica)
* permite mantener un contexto compartido por todos los loggers de la session. este contexto se puede ir enriqueciendo durante la sesion en cualquier fu
* permite matener simultaneamente varios loggers independientes en una misma session.
Los un logger queda definido  por un label especifico. -->

## Installation

```bash
npm i @one-broker-services/winston-session
```

## Enviroment variables

|env|required|description|default|
|:--:|:--:|:--:|:--:|
|`IS_LOCAL`|no|if set, logger run in `offline` mode| `undefined` |
|`IS_OFFLINE`|no|if set, logger run in `offline` mode| `undefined` |
|`LOG_LEVEL`|no|define max log level to prompt| `debug` |

> In online mode all logs are in `json` format

## Log Levels

```json
{
  "panic": 0,
  "alert": 1,
  "crit": 2,
  "error": 3,
  "warn": 4,
  "info": 5,
  "trace": 6,
  "debug": 7,
}
```

## Transports

For the moment transports are not configurable.

* In `offline` mode the logs go to the console in a cli format (fixed for the moment),
* In `online` mode the error logs or lower go to a daily rotated file, located in logs folder at the project root

## Log format

```json
{
  "timestamp",
  "level",
  "tag", // ${group}:${label}
  "message",
  "context": {
    "sessionId",
    ...
  },
  "data": {
    ...
  }

}
```

## Interface

```javascript
const logger = require('@one-broker-services/winston-session');

logger.getLogger(): winston.Logger //current winston logger
logger.setGroup(string): logger // used for tag construction ${group}:${label}
logger.setLabel(string): logger // used for tag construction ${group}:${label}
logger.addContext(object): logger // add info to session context. overwrite property if already exists. new context will be present in all logs from now on for the duration of the session

logger.debug(msg,optionalMeta)
logger.trace(msg)
logger.info(msg)
logger.warn(msg)
logger.error(msg,optionalMeta)
logger.crit(msg,optionalMeta)
logger.alert(msg,optionalMeta)
logger.panic(msg,optionalMeta)

```

> **Notice**: `setGroup`, `setLabel` and `addContext` are chaineable

## Use

```javascript
const logger = require('@one-broker-services/winston-session');
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
const logger = require('@one-broker-services/winston-session');

logger.setLabel('1');

logger.debug('debug message');
logger.trace('into test 1');
logger.info('into test 1');
logger.warn('warning message');
logger.error('error message', { error: 'ERROR HERE' });
logger.crit('crit message');
logger.alert('alert message');
logger.panic('emerg message');


```

```javascript
//file2.js
const logger = require('@one-broker-services/winston-session');

logger.setLabel('2');

logger.info('into test 1');
logger.debug('debug message');
logger.warn('warning message');
logger.error('error message');
logger.crit('crit message');
logger.alert('alert message');
logger.panic('emerg message');

```

```javascript
//proxy.js
const logger = require('@one-broker-services/winston-session');

logger.info('log some stuff w/ generic logger');
logger.addContext({ generic: 'qwrty' });
logger.info('log some stuff w/ generic logger');
logger.setGroup('TEST').setLabel('PROXY');

logger.info('start tests');
logger.debug('add context for test1');
logger.addContext({ level1Time: 'level1Time' });
logger.debug('loading test 1 from proxy');
require('./test1');

logger.debug('add context for test2');
logger.addContext({ level2Time: 'level2Time' });
logger.debug('loading test 2 from proxy');
require('./test2');
```
