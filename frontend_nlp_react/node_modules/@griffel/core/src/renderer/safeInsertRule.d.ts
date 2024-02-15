/**
 * @internal
 *
 * Calls `sheet.insertRule` and catches errors related to browser prefixes.
 */
export declare function safeInsertRule(sheet: {
    insertRule(rule: string): number | undefined;
}, ruleCSS: string): void;
