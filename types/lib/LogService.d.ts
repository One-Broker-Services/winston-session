export = LogService;
declare class LogService {
    show(): void;
    setLabel(label: any): LogService;
    setGroup(group: any): LogService;
    addContext(context: any): void;
    debug(msg: any, meta: any): void;
    trace(msg: any, meta: any): void;
    info(msg: any, meta: any): void;
    warn(msg: any, meta: any): void;
    error(msg: any, meta: any): void;
    crit(msg: any, meta: any): void;
    alert(msg: any, meta: any): void;
    panic(msg: any, meta: any): void;
}
import Loggers = require("./Loggers");
import Session = require("./LogSession");
