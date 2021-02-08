export = LogService;
declare class LogService {
    // static _getInstance(): any;
    static setLabel(label: string): typeof LogService;
    static setGroup(group: string): typeof LogService;
    static getLogger(): winston.Logger;
    static addContext(context: any): typeof LogService;
    // static _performAction(action: any, msg: any, data: any): void;
    static debug(msg: string, meta: object): void;
    static trace(msg: string, meta: object): void;
    static info(msg: string, meta: object): void;
    static warn(msg: string, meta: object): void;
    static error(msg: string, meta: object): void;
    static crit(msg: string, meta: object): void;
    static alert(msg: string, meta: object): void;
    static panic(msg: string, meta: object): void;
    // _currentLabel: any;
    // _currentGroup: string;
    // _loggers: Loggers;
    // _session: Session;
}
import winston = require("winston");
// import Loggers = require("./Loggers");
// import Session = require("./LogSession");
