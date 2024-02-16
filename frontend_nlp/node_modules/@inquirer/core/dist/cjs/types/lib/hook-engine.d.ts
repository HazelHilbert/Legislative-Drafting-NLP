import type { InquirerReadline } from './read-line.type.js';
type HookStore = {
    rl: InquirerReadline;
    hooks: any[];
    hooksCleanup: Array<void | (() => void)>;
    hooksEffect: Array<() => void>;
    index: number;
    handleChange: () => void;
};
type Pointer = {
    get(): any;
    set(value: any): void;
    initialized: boolean;
};
export declare function withHooks(rl: InquirerReadline, cb: (store: HookStore) => void): void;
export declare function readline(): InquirerReadline;
export declare function withUpdates<T extends (...args: any) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T>;
export declare function withPointer<Value>(cb: (pointer: Pointer) => Value): Value;
export declare function handleChange(): void;
export declare const effectScheduler: {
    queue(cb: (readline: InquirerReadline) => void): void;
    run(): void;
};
export {};
