export = MDC;
declare class MDC {
    static instance(): any;
    static clear(): void;
    global: {
        _globalContextId: string;
    };
}
