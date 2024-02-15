import type { CONTROLLER, ELEMENT_METADATA } from 'extension/utils/constants';
import type { Controller } from './controller';
import type { References } from 'extension/utils/references';
/**
 * @public
 */
export type MiddlewareData = {
    type: `${string}Middleware`;
};
export type Data = {
    type: string;
};
export type MiddlewareMetadata = {
    serializedData: MiddlewareData[];
    references: References;
};
export type Metadata = {
    serializedData: Data[];
    references: References;
};
export interface HTMLElementWithMetadata<M extends Metadata = Metadata> extends HTMLElement {
    [ELEMENT_METADATA]: M;
}
declare global {
    interface Window {
        [CONTROLLER]: Controller;
    }
}
export type { devtools } from './middleware';
export type { devtools as middleware } from './middleware';
