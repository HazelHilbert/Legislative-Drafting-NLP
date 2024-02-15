import type { GriffelResetStyle } from '@griffel/style-types';
import type { GriffelRenderer, GriffelInsertionFactory } from './types';
export interface MakeResetStylesOptions {
    dir: 'ltr' | 'rtl';
    renderer: GriffelRenderer;
}
export declare function makeResetStyles(styles: GriffelResetStyle, factory?: GriffelInsertionFactory): (options: MakeResetStylesOptions) => string;
