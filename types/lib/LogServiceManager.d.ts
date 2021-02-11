export = LogService;
declare class LogService {
    constructor(level: any);
    start(level?: string): void;
    _level: string;
    _winstonService: typeof winston;
    _service: any;
    _paused: boolean;
    _offlineMode: string;
    pause(): void;
    get winston(): typeof winston;
    set level(arg: any);
    get level(): any;
    addLogger(id?: string, options?: winston.LoggerOptions): winston.Logger;
    configLogger(id?: string, options?: winston.LoggerOptions): winston.Logger;
    log(loggerId: string, level: string, msg: string, ...meta: object[]): void;
}
import winston = require("winston");
