export = LogService;
declare class LogService {
    static getWinston(): winston;
    static getLogger(id: string, options: winston.LoggerOptions): winston.Logger;
    static configLogger(id: string, options: winston.LoggerOptions): winston.Logger;
    static instance(): any;
    constructor(options?: winston.LoggerOptions);
}
import winston = require("winston");
