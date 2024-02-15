import type { Middleware, MiddlewareState } from '@floating-ui/dom';
import type { MiddlewareData } from './types';
/**
 * devtools middleware
 * @public
 */
export declare const devtools: (targetDocument?: Document, middlewareDataCallback?: (state: MiddlewareState) => MiddlewareData) => Middleware;
