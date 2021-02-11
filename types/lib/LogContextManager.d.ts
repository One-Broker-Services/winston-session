export = ContextManager;
declare class ContextManager {
    _context: any;
    _getGlobal(): any;
    _getLocal(id?: string): any;
    _resetLocal(id: string): void;
    _reset(): void;
    _updateGlobal(data: object): void;
    _updateLocal(data: object, id: string): void;
    get id(): string;
    get(id: any): {
        global: object;
        local: object;
    };
    reset(id: string): {
        global: object;
        local: object;
    };
    update(data: object, id: string): {
        global: object;
        local: object;
    };
}
