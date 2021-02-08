export = SessionLogger;
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
declare class SessionLogger {
    static debug(msg: any, meta: any): void;
    static info(msg: any, meta: any): void;
    static verbose(msg: any, meta: any): void;
    static warning(msg: any, meta: any): void;
    static error(msg: any, meta: any): void;
    static crit(msg: any, meta: any): void;
    static alert(msg: any, meta: any): void;
    static emerg(msg: any, meta: any): void;
    static forceOfflineMode(): typeof SessionLogger;
    static _addLogger(label: any): void;
    static _getInstance(): any;
    static addContext(context: any, overwrite?: boolean): typeof SessionLogger;
    static getLogger(label?: string): any;
    _context: {
        sessionId: any;
    };
    _level: string;
    _offlineMode: string;
    fileTransport: import("winston-daily-rotate-file");
    consoleTransport: winston.transports.ConsoleTransportInstance;
    _currentLabel: string;
    _currentLogger: winston.Logger;
}
import winston = require("winston");
