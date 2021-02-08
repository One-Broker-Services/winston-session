export = LogSession;
declare class LogSession {
    updateContext(context: any, overwrite?: boolean): LogSession;
    context: any;
    resetContext(): void;
}
