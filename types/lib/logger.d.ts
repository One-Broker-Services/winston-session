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
    static forceOfflineMode(): typeof SessionLogger;
    // static _getInstance(): any;
    static addContext(context: object, overwrite?: boolean): typeof SessionLogger;
    static getLogger(label?: string): winston.Logger;
    _context: {
        sessionId: string;
    };
    _level: string;
    _currentLabel: string;
    _currentLogger: winston.Logger;
    _offlineMode: boolean;
    fileTransport: import("winston-daily-rotate-file");
    consoleTransport: winston.transports.ConsoleTransportInstance;
}
import winston = require("winston");
