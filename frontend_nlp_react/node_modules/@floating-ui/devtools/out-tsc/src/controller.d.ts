import type { HTMLElementWithMetadata } from './types';
export type Controller = {
    withdraw(): void;
    select(element?: HTMLElement | null): HTMLElementWithMetadata | null;
    readonly selectedElement: HTMLElementWithMetadata | null;
};
export declare const createController: (defaultView: Window) => Controller;
export declare const injectController: ({ defaultView }: Document) => void;
export declare const getController: (targetDocument: Document) => Controller | null;
