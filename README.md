# Description

A simple contextual logging system for [`winston`](<https://www.npmjs.com/package/winston>), with [Mapped Diagnostic Context](<https://logback.qos.ch/manual/mdc.html>)   support

> **Disclaimer**
This is a work in progress, current versions are still unstable, so breaking changes may come in the near future.
Any comment, suggestions or contributions are welcome.
<destevezbreso@gmail.com>

## Motivation

Logs are often generated independently of each other, and while they may share certain information, their main purpose is to provide specific information for a given situation. This makes it difficult to explore more details about the event, such as the cause, previous actions, or even additional details surrounding the event itself.

Contextual logging is an approach that encourages not only adding additional useful data to log events, but also sharing that data between related events.

<!-- Con el registro contextual, los tokens de datos se agregan y eliminan de los eventos de registro durante el transcurso del tiempo de ejecución de la aplicación.
Según el flujo de trabajo de su aplicación, algunos de estos tokens se pueden compartir en varios eventos de registro o incluso en toda la aplicación. Mientras tanto, sus eventos de registro aún conservan información de registro principal, como nombres de métodos y seguimientos de pila. -->

<!-- winston es una popular herramienta de logging para javascript
Con winston, si bien es posible para cada evento registrar los datos necesarios manualmente en el momento del log como metadatos, -->

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

> In online mode all logs are in `json` format

## Log Levels

Log levels indicate priority, more priority for lower values.

```json
{
  "panic": 0,
  "alert": 1,
  "error": 2,
  "footprint": 3,
  "warn": 4,
  "info": 5,
  "trace": 6,
  "debug": 7,
}
```

## Transports

For now transports are not configurable.

* In `offline` mode the logs go to the console in a cli format (fixed for the moment),
* In `online` mode the error logs or lower go to a daily rotated file, located in logs folder at the project root

## Log format

```javascript
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
logger.footprint(msg,optionalMeta)
logger.alert(msg,optionalMeta)
logger.panic(msg,optionalMeta)

```

> **Notice**: `setGroup`, `setLabel` and `addContext` are chaineable

## Use

```javascript
const logger = require('@one-broker-services/winston-session');

logger
  .setGroup('TEST')
  .setLabel('BASIC')
  .addContext(somePersistentContext);


logger.panic('some message', someoOptionalMeta)
logger.alert('some message', someoOptionalMeta)
logger.footprint('some important checkpoint data', { data: { a: 'qwert' } });

// maybe in another file
logger.addContext(morePersistentContext) 

logger.error('some message', someoOptionalMeta)
logger.warn('some message')
logger.info('some message')
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
logger.footprint('some important checkpoint data', { data: { a: 'qwert' } });
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
logger.footprint('some important checkpoint data', { data: { a: 'qwert' } });
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
