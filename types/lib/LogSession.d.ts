export = LogSession;

declare class LogSessionOptions {
    name: string;
}

declare class LogSession {
    constructor(opt?: LogSessionOptions);
    _name: string;
    _mdcLevel: string;
    _segment: any;
    _loggerId: string;
    _group: string;
    _label: string;
    _level: string;
    _mdc: MDCManager;
    _service: ServiceManager;
    _logger: winston.Logger;
    get mdc(): {
        put: (ctx: any) => void;
    };
    get mdcSegment(): {
        put: (ctx: any) => void;
    };
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
    footprint(msg: string, meta: object): void;
}
import winston = require("winston");
import MDCManager = require("./MDCManager");
import ServiceManager = require("./LogServiceManager");
