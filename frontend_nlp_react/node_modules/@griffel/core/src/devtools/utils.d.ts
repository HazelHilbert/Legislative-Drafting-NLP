import type { LookupItem } from '../types';
import type { DebugAtomicClassName, DebugSequence } from './types';
export declare function getDebugClassNames(lookupItem: LookupItem, parentLookupItem?: LookupItem, parentDebugClassNames?: DebugAtomicClassName[], overridingSiblings?: DebugSequence[]): DebugAtomicClassName[];
