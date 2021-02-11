import winston = require("winston");
export namespace levels {
    const panic: number;
    const alert: number;
    const error: number;
    const backup: number;
    const warn: number;
    const info: number;
    const trace: number;
    const debug: number;
}
export namespace colors {
    const panic_1: string;
    export { panic_1 as panic };
    const alert_1: string;
    export { alert_1 as alert };
    const error_1: string;
    export { error_1 as error };
    const backup_1: string;
    export { backup_1 as backup };
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
    namespace offlineConsole {
        const handleExceptions: boolean;
        const format: winston.Logform.Format;
    }
    namespace onlineConsole {
        const handleExceptions_1: boolean;
        export { handleExceptions_1 as handleExceptions };
        const format_1: winston.Logform.Format;
        export { format_1 as format };
    }
    namespace file {
        const handleExceptions_2: boolean;
        export { handleExceptions_2 as handleExceptions };
        export const filename: string;
        export const level: string;
        export const datePattern: string;
        export const zippedArchive: boolean;
        export const maxFiles: string;
        const format_2: winston.Logform.Format;
        export { format_2 as format };
    }
    const els: any;
    const sentry: any;
}
