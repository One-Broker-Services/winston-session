export = MDCManager;
declare class MDCManager {
    _mdc: any;
    _getGlobal(): any;
    _getLocal(id?: string): any;
    _clearLocal(id: string): void;
    _clear(): void;
    _putGlobal(data: object): void;
    _putLocal(data: object, id: string): void;
    get id(): string;
    get(id: any): {
        global: object;
        local: object;
    };
    clear(id: string): {
        global: object;
        local: object;
    };
    put(data: object, id: string): {
        global: object;
        local: object;
    };
}
