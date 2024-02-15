import type { GriffelRenderer, StylesBySlots } from './types';
import type { GriffelInsertionFactory } from './types';
export interface MakeStylesOptions {
    dir: 'ltr' | 'rtl';
    renderer: GriffelRenderer;
}
export declare function makeStyles<Slots extends string | number>(stylesBySlots: StylesBySlots<Slots>, factory?: GriffelInsertionFactory): (options: MakeStylesOptions) => Record<Slots, string>;
