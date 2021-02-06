export = Logger;
declare class Logger {
    static getLogger(label: string): winston.Logger;
    static logFormatTemplate(i: object): string;
}
import winston = require("winston");
