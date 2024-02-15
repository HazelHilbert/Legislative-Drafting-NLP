import type { GriffelInsertionFactory } from './types';
/**
 * Default implementation of insertion factory. Inserts styles only once per renderer and performs
 * insertion immediately after styles computation.
 *
 * @internal
 */
export declare const insertionFactory: GriffelInsertionFactory;
