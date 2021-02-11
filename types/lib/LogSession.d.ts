export = LogSession;

declare class LogSessionOptions {
    name: string;
}

declare class LogSession {
    constructor(opt?: LogSessionOptions);
    get mdc(): {
        put: (ctx: object) => void;
    };
    get mdcSegment(): {
        put: (ctx: object) => void;
    };
    globalConfig(options: winston.LoggerOptions): void;
    getLogger(): winston.Logger;
    startSegment(segment: string): LogSession;
    endSegment(): void;
    startGroup(group: string): LogSession;
    endGroup(): LogSession;
    log(action: string, msg: string, data: object): void;
    debug(msg: string, meta: object): void;
    trace(msg: string, meta: object): void;
    info(msg: string, meta: object): void;
    warn(msg: string, meta: object): void;
    error(msg: string, meta: object): void;
    alert(msg: string, meta: object): void;
    panic(msg: string, meta: object): void;
    backup(msg: string, meta: object): void;
}
import winston = require("winston");
import MDCManager = require("./MDCManager");
import ServiceManager = require("./LogServiceManager");import winston = require("winston/lib/winston/config");

