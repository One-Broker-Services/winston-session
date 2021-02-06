const { createLogger, format, transports } = require('winston');
const path = require('path');

// Get logging level
const level = process.env.log || 'debug';

process.env.STAGE = process.env.STAGE || 'dev';

function printf(info) {
  return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
}

const logger = createLogger({
  exitOnError: false,
  level,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.label({ label: path.basename(process.mainModule.filename) }),

    // format.printf((info) => `${JSON.stringify({
    //   t: info.timestamp,
    //   l: info.level,
    //   m: info.message,
    //   s: info.splat !== undefined ? `${info.splat}` : '',
    // })},`),
  ),
  exceptionHandlers: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${printf(info)}`),
      ),
    }),
  ],
});

if (process.env.STAGE === 'dev') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${printf(info)}`),
      ),
    }),
  );
}

if (process.env.NODE_ENV !== 'PRODUCTION') {
  logger.add(new transports.Console({ format: format.cli() }));

  // Turn these on to create logs as if it were production
  // logger.add(new transports.File({ filename: 'log/output/error.log', level: 'error' }));
  // logger.add(new transports.File({ filename: 'log/output/warn.log', level: 'warn' }));
  // logger.add(new transports.File({ filename: 'log/output/info.log', level: 'info' }));
} else {
  logger.add(new transports.File({ filename: 'log/output/error.log', level: 'error' }));
  logger.add(new transports.File({ filename: 'log/output/warn.log', level: 'warn' }));
  logger.add(new transports.File({ filename: 'log/output/info.log', level: 'info' }));
}

// let instance = null;

// /**
//  * Logger Base class
//  */
// class OBSLogger {
//   constructor() {
//     // super();
//     this.logger = createLogger({
//       exitOnError: false,
//       level,
//       format: format.combine(
//         format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         format.label({ label: path.basename(process.mainModule.filename) }),

//         // format.printf((info) => `${JSON.stringify({
//         //   t: info.timestamp,
//         //   l: info.level,
//         //   m: info.message,
//         //   s: info.splat !== undefined ? `${info.splat}` : '',
//         // })},`),
//       ),
//     });
//   }

//   static getInstance() {
//     if (!instance) {
//       instance = new OBSLogger().logger;
//     }
//     return instance;
//   }
// }

// module.exports = OBSLogger;

module.exports = logger;
