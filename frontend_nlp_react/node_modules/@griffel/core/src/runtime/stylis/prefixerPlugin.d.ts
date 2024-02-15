import type { Element, Middleware } from 'stylis';
export declare function prefix(value: string, length: number, children?: Element[]): string;
/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
export declare function prefixerPlugin(element: Element, index: number, children: Element[], callback: Middleware): string | undefined;
