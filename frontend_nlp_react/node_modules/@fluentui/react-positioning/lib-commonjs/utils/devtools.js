"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "devtoolsCallback", {
    enumerable: true,
    get: function() {
        return devtoolsCallback;
    }
});
const _reactutilities = require("@fluentui/react-utilities");
const _listScrollParents = require("./listScrollParents");
const _fromFloatingUIPlacement = require("./fromFloatingUIPlacement");
const devtoolsCallback = (options)=>(middlewareState)=>{
        const { elements: { floating, reference } } = middlewareState;
        const scrollParentsSet = new Set();
        if ((0, _reactutilities.isHTMLElement)(reference)) {
            (0, _listScrollParents.listScrollParents)(reference).forEach((scrollParent)=>scrollParentsSet.add(scrollParent));
        }
        (0, _listScrollParents.listScrollParents)(floating).forEach((scrollParent)=>scrollParentsSet.add(scrollParent));
        const flipBoundaries = Array.isArray(options.flipBoundary) ? options.flipBoundary : (0, _reactutilities.isHTMLElement)(options.flipBoundary) ? [
            options.flipBoundary
        ] : [];
        const overflowBoundaries = Array.isArray(options.overflowBoundary) ? options.overflowBoundary : (0, _reactutilities.isHTMLElement)(options.overflowBoundary) ? [
            options.overflowBoundary
        ] : [];
        return {
            type: 'FluentUIMiddleware',
            middlewareState,
            options,
            initialPlacement: (0, _fromFloatingUIPlacement.fromFloatingUIPlacement)(middlewareState.initialPlacement),
            placement: (0, _fromFloatingUIPlacement.fromFloatingUIPlacement)(middlewareState.placement),
            flipBoundaries,
            overflowBoundaries,
            scrollParents: Array.from(scrollParentsSet)
        };
    };
