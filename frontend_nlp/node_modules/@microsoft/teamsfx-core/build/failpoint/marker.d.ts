export declare type Value = {
    kind: "string";
    value: string;
} | {
    kind: "number";
    value: number;
} | {
    kind: "boolean";
    value: boolean;
};
export declare function inject(name: string, body: () => unknown): void;
export declare function inject(name: string, body: (val: Value | undefined) => unknown): void;
//# sourceMappingURL=marker.d.ts.map