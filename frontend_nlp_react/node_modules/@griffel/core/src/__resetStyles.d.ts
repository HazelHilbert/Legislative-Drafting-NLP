import type { MakeResetStylesOptions } from './makeResetStyles';
import type { CSSRulesByBucket, GriffelInsertionFactory } from './types';
/**
 * @internal
 */
export declare function __resetStyles(ltrClassName: string, rtlClassName: string | null, cssRules: CSSRulesByBucket | string[], factory?: GriffelInsertionFactory): (options: MakeResetStylesOptions) => string;
