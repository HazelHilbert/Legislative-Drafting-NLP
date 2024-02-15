import type { CSSRulesByBucket } from '@griffel/core';
/**
 * A version of makeResetStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
export declare function __resetStyles(ltrClassName: string, rtlClassName: string | null, cssRules: CSSRulesByBucket | string[]): () => string;
