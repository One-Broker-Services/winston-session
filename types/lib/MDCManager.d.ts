export = MDCManager;
declare class MDCManager {

    get id(): any;
    get(id: any): {
        global: any;
        local: any;
    };
    clear(id: any): {
        global: any;
        local: any;
    };
    put(data: any, id: any): {
        global: any;
        local: any;
    };
}
