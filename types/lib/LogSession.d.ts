declare const _exports: LogSession;
export = _exports;
declare class LogSession {
    setLabel(label: any): LogSession;
    setGroup(group: any): LogSession;
    constructor(sessionName: string);
    _name: any;
    _context: ContextManager;
    _service: ServiceManager;
    _loggerId: string;
    _logger: any;
    _group: any;
    _label: any;
    getLogger(): winston.Logger;
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
