export = LogSession;
/**
 *
 * log structure
 * timestamp: string
 * level: string [emerg (0) <- alert <- crit <- error<- warning<- notice <- info <- debug (7)]
 * label: string
 * context: object
 * data: object
 *
 * Nota:
 * -
 */
declare class LogSession {
    static getInstance(): any;
    static addContext(context: any, overwrite?: boolean): typeof LogSession;
    static getLogger(label?: string): any;
    static logFormatTemplate(maxlevel?: any): (info: any) => string;
    _level: string;
    _currentLabel: any;
    _currentLogger: any;
    _context: {
        loggerId: any;
    };
    fileTransport: import("winston-daily-rotate-file");
    consoleTransport: winston.transports.ConsoleTransportInstance;
}
import winston = require("winston");
