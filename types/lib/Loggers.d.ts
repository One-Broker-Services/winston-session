export = LoggerCollection;
declare class LoggerCollection {
    get(label: any): winston.Logger;
}
import winston = require("winston");
