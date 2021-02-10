export = ContextManager;
declare class ContextManager {
    _getGlobal(): any;
    _getLocal(id?: any): any;
    _resetLocal(id: any): void;
    _reset(): void;
    _context: any;
    _updateGlobal(data: any): void;
    _updateLocal(data: any, id: any): void;
    get(id: any): {
        global: any;
        local: any;
    };
    reset(id: any): {
        global: any;
        local: any;
    };
    update(data: any, id: any): {
        global: any;
        local: any;
    };
}
