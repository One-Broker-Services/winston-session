export = LogSession;
declare class LogSession {
    updateContext(context: any, overwrite?: boolean): LogSession;
    resetContext(): void;
}
