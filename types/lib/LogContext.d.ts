export = LogContext;
declare class LogContext {
    static instance(): any;
    static reset(): void;
    global: {
        _globalContextId: string;
    };
}
