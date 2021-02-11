export = LogSession;
declare class LogSessionOptions {
    name: string;
}
declare class LogSession {
    constructor(opt: LogSessionOptions);
    _name: string;
    _segment: string;
    _loggerId: string;
    _group: string;
    _label: string;
    _level: string;
    _context: ContextManager;
    _service: ServiceManager;
    _contextLevel: string
    _logger: winston.Logger;
    getLogger(): winston.Logger;
    setLabel(label: string): LogSession;
    startSegment(segment: string): LogSession;
    endSegment(): void;
    startGroup(group: string): LogSession;
    endGroup(): LogSession;
    addContextSegment(ctx: object): void;
    addContext(ctx: object): void;
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
import ContextManager = require("./LogContextManager");
import ServiceManager = require("./LogServiceManager");
