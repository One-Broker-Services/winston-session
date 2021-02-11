export = LogService;
declare class LogService {
    constructor(level: any);
    start(level?: string): void;
    _level: string;
    _winstonService: typeof winston;
    _service: any;
    _paused: boolean;
    _offlineMode: string;
    _defaultLoggerOpt: {
        levels: {
            panic: number;
            alert: number;
            error: number;
            backup: number;
            warn: number;
            info: number;
            trace: number;
            debug: number;
        };
        exitOnError: boolean;
        level: any;
        transports: (winston.transports.ConsoleTransportInstance | import("winston-daily-rotate-file"))[];
        format: winston.Logform.Format;
        exceptionHandlers: winston.transports.ConsoleTransportInstance[];
    };
    pause(): void;
    get winston(): typeof winston;
    get loggers(): any;
    set level(arg: any);
    get level(): any;
    logger(id?: string, options?: {
        levels: {
            panic: number;
            alert: number;
            error: number;
            backup: number;
            warn: number;
            info: number;
            trace: number;
            debug: number;
        };
        exitOnError: boolean;
        level: any;
        transports: (winston.transports.ConsoleTransportInstance | import("winston-daily-rotate-file"))[];
        format: winston.Logform.Format;
        exceptionHandlers: winston.transports.ConsoleTransportInstance[];
    }): any;
    log(loggerId: any, level: any, msg: any, ...meta: any[]): void;
}
import winston = require("winston");
