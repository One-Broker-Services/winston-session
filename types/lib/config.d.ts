import winston = require("winston");
export namespace levels {
    const backup: number;
    const panic: number;
    const alert: number;
    const error: number;
    const warn: number;
    const info: number;
    const trace: number;
    const debug: number;
}
export namespace colors {
    const backup_1: string;
    export { backup_1 as backup };
    const panic_1: string;
    export { panic_1 as panic };
    const alert_1: string;
    export { alert_1 as alert };
    const error_1: string;
    export { error_1 as error };
    const warn_1: string;
    export { warn_1 as warn };
    const info_1: string;
    export { info_1 as info };
    const trace_1: string;
    export { trace_1 as trace };
    const debug_1: string;
    export { debug_1 as debug };
}
export namespace transportsOpt {
    namespace _default {
        const handleExceptions: boolean;
        const format: winston.Logform.Format;
    }
    export { _default as default };
    export namespace offlineConsole {
        const handleExceptions_1: boolean;
        export { handleExceptions_1 as handleExceptions };
        const format_1: winston.Logform.Format;
        export { format_1 as format };
    }
    export namespace onlineConsole {
        const handleExceptions_2: boolean;
        export { handleExceptions_2 as handleExceptions };
        const format_2: winston.Logform.Format;
        export { format_2 as format };
    }
    export namespace file {
        const handleExceptions_3: boolean;
        export { handleExceptions_3 as handleExceptions };
        export const filename: string;
        export const level: string;
        export const datePattern: string;
        export const zippedArchive: boolean;
        export const maxFiles: string;
        const format_3: winston.Logform.Format;
        export { format_3 as format };
    }
    export const els: any;
    export const sentry: any;
}
