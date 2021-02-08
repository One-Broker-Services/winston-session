export = LoggerCollection;
declare class LoggerCollection {
    constructor(label?: string);
    _level: string;
    _offlineMode: string;
    fileTransport: import("winston-daily-rotate-file");
    consoleTransport: winston.transports.ConsoleTransportInstance;
    get(label: any): winston.Logger;
}
import winston = require("winston");
