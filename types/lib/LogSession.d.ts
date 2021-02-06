export = LogSession;
declare class LogSession {
    static getLogger(label: string): winston.Logger;
    static logFormatTemplate(info: object): string;
}
import winston = require("winston");
