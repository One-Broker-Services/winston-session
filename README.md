# Description

A simple contextual logging system for [`winston`](<https://www.npmjs.com/package/winston>), inspired in [Mapped Diagnostic Context](<https://logback.qos.ch/manual/mdc.html>)

> **Disclaimer**
This is a work in progress, current versions are still unstable, so breaking changes may come in the near future.
Any comments, suggestions or contributions [are welcome](<https://github.com/One-Broker-Services/winston-session/issues>)

## Motivation

Logs are often generated independently of each other, and while they may share certain information, their main purpose is to provide specific information for a given situation. This makes it difficult to explore more details about the event, such as the cause, previous actions, or even additional details surrounding the event itself.

Contextual logging is an approach that encourages not only adding additional useful data to log events, but also sharing that data between related events.

<!-- Con el registro contextual, los tokens de datos se agregan y eliminan de los eventos de registro durante el transcurso del tiempo de ejecución de la aplicación.
Según el flujo de trabajo de su aplicación, algunos de estos tokens se pueden compartir en varios eventos de registro o incluso en toda la aplicación. Mientras tanto, sus eventos de registro aún conservan información de registro principal, como nombres de métodos y seguimientos de pila. -->

<!-- winston es una popular herramienta de logging para javascript
Con winston, si bien es posible para cada evento registrar los datos necesarios manualmente en el momento del log como metadatos, -->
<!-- 
Often when there are lot of microservices and logs are been forwarded it becomes difficult to find the reason for error and sequence of events that might have caused the error. MDC approach helps to group together the events that are related to specific event for eg. Order Checkout failed or Payment Failure on Ecommerce site.As customer is unaware of the internal things it is wise idea to add some related information as correlationIds like { orderID: 101 } so it can be searched quickly. -->

### How is `winston-logger` useful?

`winston-logger` allows you to enrich your logs with additional data without having to add it each time on each log call (or modify the code already written in a multitude of places). Additionally, it makes it easy for you to map log events based on a common data point, such as a unique identifier, username, or endpoint.
<!-- Puede agregar y eliminar del contexto durante el transcurso de la aplicación sin tener que realizar un seguimiento de lo que se almacena en el contexto y dónde aparece en sus registros. -->

## Higligths

* One session (w/ a global context) and multiple session segments (w/ local context each)
* dynamicaly generated segment tag act as namespace for logs and local context
* provide a simplified interface that focuses on what to log over how to log (but you still have some level of control over `winston` )
* simplify **structured logging** approaches

> **Tip**: With namespaces, you can also create your own namespace dictionary, which allows you to define which namespace patterns you want and reject any calls to logs that don’t conform to your namespace dictionary patterns. That makes it much easier to enforce clean logging standards throughout your application.

<!-- * a `winston` logger can be particular for ona segment or can be shared for all segments (you decide) -->

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
|`LOG_CTX_LEVEL`|no|define max log level to attach context| `debug` |

## Log Levels

Log levels indicate priority, more priority for lower values.

```json
{
  "backup": 0,
  "panic": 1,
  "alert": 2,
  "error": 3,
  "warn": 4,
  "info": 5,
  "trace": 6,
  "debug": 7,
}
```

## Transports

Logger transports are configurable through `globalConfig` method.

* default: console, level `debug` and `json` format

<!-- *In `offline` mode:
  * logs go to the console in a cli format (fixed for the moment)
  <!-- * error logs or lower go to a daily rotated file, located in logs folder at project root -->
* In `online` mode:
  * logs go to the console in uncolorized json format -->

## Log format

```javascript
{
  "_timestamp",
  "_segmentId", // ${group}:${label}
  "_context": {
    "_id",
    ...
  },
  "_meta": {
    ...
  }
  "message",
  "level",
  "label",
}
```

### Example

## Interface

```javascript
const LogSession = require('@one-broker-services/winston-session');
const logger = new LogSession();
globalConfig(winston.LoggerOptions) // configure global logger for all sessions and segments in app timeline
logger.getLogger(): winston.Logger //current winston logger
logger.setGroup(string): logger // used for tag construction ${group}:${label}
logger.mdc.put(object):  // put info to session context. overwrite property if already exists. new context will be present in all logs from now on session timeline
logger.mdcSegment.put(object):  // put info into current segment context scope. overwrite property if already exists. new context will be present in all logs in te current segment scope

logger.debug(msg,optionalMeta)
logger.trace(msg)
logger.info(msg)
logger.warn(msg)
logger.error(msg,optionalMeta)
logger.backup(msg,optionalMeta)
logger.alert(msg,optionalMeta)
logger.panic(msg,optionalMeta)

```

> **Notice**: `setGroup`, `startSegment` and are chaineable

## Use

```javascript
const logger = require('@one-broker-services/winston-session');

const logger = new LogSession();
logSession.globalConfig(winston.LoggerOptions);

logger.startSegment('TEST');

logger.mdc.put(somePersistentContext);

// ...

logger.mdcSegment.put(morePersistentContext); // ... but only for current segment

// ...

logger.panic('some message', someoOptionalMeta)
logger.alert('some message', someoOptionalMeta)
logger.backup('some important checkpoint data', { data: { a: 'qwert' } });

// maybe in another file
logger.mdc.put(morePersistentContext) // visible for all logs from now in the timeline

logger.error('some message', someoOptionalMeta)
logger.warn('some message')
logger.info('some message')
logger.debug('some message', someoOptionalMeta)

```

## Example

```javascript
//file1.js
const LogSession = require('@one-broker-services/winston-session');

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


```

```javascript
//file2.js
const LogSession = require('@one-broker-services/winston-session');

const logSession = new LogSession();
logSession.startSegment('TEST1');

logSession.info('into test 1');
logSession.debug('debug message');
logSession.warn('warning message');
logSession.error('error message');
logSession.alert('alert message');
logSession.panic('emerg message');

logSession.backup('some important checkpoint data', { data: { a: 'qwert' } });

```

```javascript
//proxy.js
const LogSession = require('@one-broker-services/winston-session');

const winston = require('winston');

const loggerOptions = {
  level: 'debug',
  transports: [new winston.transports.Console({
    handleExceptions: true,
    level: 'error',
    format: winston.format.combine(
      winston.format.colorize(), // winston.format.cli(),
      winston.format.printf((info) => `${info.level} ${info.message}`),
    ),
  })],
};

const logSession = new LogSession();

// You can optionaly configure a global logger for all sessions and segments used in app timeline
logSession.globalConfig(loggerOptions);

logSession.info('log some stuff in generic segment');

logSession.startSegment('ENTRY_POINT');

logSession.info('hello im now in entry point');

logSession.startGroup('AUTH');
logSession.debug('add local context');
logSession.mdcSegment.put({ authInfo: 'this is a local context info for session: ENTRY_POINT:AUTH' });

// .....

logSession.info('try to autenticate user');
logSession.mdc.put({ endpoint: '/example', username: 'user', role: 'admin' });
logSession.info('auth success');

logSession.startGroup('LOAD_ROUTES');

logSession.info('loading...');
logSession.debug('add local context');
logSession.mdcSegment.put({ level1Time: 'level1Time' });
logSession.debug('loading test 1 from proxy');
require('./test1');

logSession.debug('add context for test2');
logSession.mdcSegment.put({ level2Time: 'level2Time' });
logSession.debug('loading test 2 from proxy');
require('./test2');

logSession.info('proxy finish');


```

<!--similar: https://www.npmjs.com/package/@zebpay/colt -->
<!-- https://www.npmjs.com/package/winston-context -->