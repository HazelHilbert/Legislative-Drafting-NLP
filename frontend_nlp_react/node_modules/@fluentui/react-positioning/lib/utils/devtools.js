import { isHTMLElement } from '@fluentui/react-utilities';
import { listScrollParents } from './listScrollParents';
import { fromFloatingUIPlacement } from './fromFloatingUIPlacement';
export const devtoolsCallback = (options)=>(middlewareState)=>{
        const { elements: { floating, reference } } = middlewareState;
        const scrollParentsSet = new Set();
        if (isHTMLElement(reference)) {
            listScrollParents(reference).forEach((scrollParent)=>scrollParentsSet.add(scrollParent));
        }
        listScrollParents(floating).forEach((scrollParent)=>scrollParentsSet.add(scrollParent));
        const flipBoundaries = Array.isArray(options.flipBoundary) ? options.flipBoundary : isHTMLElement(options.flipBoundary) ? [
            options.flipBoundary
        ] : [];
        const overflowBoundaries = Array.isArray(options.overflowBoundary) ? options.overflowBoundary : isHTMLElement(options.overflowBoundary) ? [
            options.overflowBoundary
        ] : [];
        return {
            type: 'FluentUIMiddleware',
            middlewareState,
            options,
            initialPlacement: fromFloatingUIPlacement(middlewareState.initialPlacement),
            placement: fromFloatingUIPlacement(middlewareState.placement),
            flipBoundaries,
            overflowBoundaries,
            scrollParents: Array.from(scrollParentsSet)
        };
    };
