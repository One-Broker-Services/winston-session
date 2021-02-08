export = LogService;
declare class LogService {
    // static _getInstance(): any;
    static setLabel(label: any): typeof LogService;
    static setGroup(group: any): typeof LogService;
    static addContext(context: any): void;
    // static _performAction(action: any, msg: any, data: any): void;
    static debug(msg: any, meta: any): void;
    static trace(msg: any, meta: any): void;
    static info(msg: any, meta: any): void;
    static warn(msg: any, meta: any): void;
    static error(msg: any, meta: any): void;
    static crit(msg: any, meta: any): void;
    static alert(msg: any, meta: any): void;
    static panic(msg: any, meta: any): void;
    // _currentLabel: any;
    // _currentGroup: string;
    // loggers: Loggers;
    // _session: Session;
}
// import Loggers = require("./Loggers");
// import Session = require("./LogSession");
