const winston = require('winston');
const moment = require('moment');
require('winston-daily-rotate-file');

const logger = createLogger({
  defaultMeta: {
    _context: global.logContext,
  },
  levels: config.syslog.levels,
  // colors: config.syslog.colors,
  exitOnError: false,
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // format.label({ label: path.basename(process.mainModule.filename) }),
    // format.label({ label: global.logContext.requestId }),

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

if (offlineEnv) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        // format.json(),
        format.printf((info) => `${printf(info)}`),
      ),
    }),
  );
  logger.add(
    new (winston.transports.DailyRotateFile)({
      filename: 'logs/%DATE%-errors.log',
      // auditFile: 'logs/%DATE%-audit.json',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      // maxSize: '20m',
      maxFiles: '24h',
      format: format.combine(
        format.json(),
      ),
    }),
  );
}

// if (offlineEnv) {
//   logger.add(new transports.Console({ format: format.cli() }));

//   // Turn these on to create logs as if it were production
//   // logger.add(new transports.File({ filename: 'log/output/error.log', level: 'error' }));
//   // logger.add(new transports.File({ filename: 'log/output/warn.log', level: 'warn' }));
//   // logger.add(new transports.File({ filename: 'log/output/info.log', level: 'info' }));
// } else {
//   logger.add(new transports.File({ filename: 'log/output/error.log', level: 'error' }));
//   logger.add(new transports.File({ filename: 'log/output/warn.log', level: 'warn' }));
//   logger.add(new transports.File({ filename: 'log/output/info.log', level: 'info' }));
// }

let instance = null;
class Logger {
  constructor(session) {
    this.sessionId = session;
    // this.transport = transport;
    // this.transport.formatter = (options) => `${options.timestamp()} -${this.sessionId}- ${options.level}: ${options.message}`;
    this.logger = createLogger({
      levels: config.syslog.levels,
      exitOnError: false,
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        // format.label({ label: path.basename(process.mainModule.filename) }),
        // format.label({ label: global.logContext.requestId }),

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
      transports: [this.transport],
    });
    if (offlineEnv) {
      this.logger.add(
        new transports.Console({
          format: format.combine(
            // format.colorize(),
            format.json(),
            // format.printf((info) => `${printf(info)}`),
          ),
        }),
      );
    }
  }

  static getInstance() {
    if (!instance) {
      const newLogger = new Logger();
      instance = newLogger.logger;
      // debug('[OBS_SERVICE:AWS] instance:');
      // debug(instance);
    }
    return instance;
  }
}

module.exports = logger; // Logger.getInstance();
