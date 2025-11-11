export declare function throttle(fn: Function, wait: number): {
    (this: any, ...args: any[]): void;
    cancel(): void;
};
export declare function debounce<T extends (...args: any[]) => any>(fn: T, wait: number): T & {
    cancel: () => void;
};
export declare function isSameValue(a: string | number, b: string | number): boolean;
export declare function getDataKey(item: any, dataKey: string | string[]): string | number;
