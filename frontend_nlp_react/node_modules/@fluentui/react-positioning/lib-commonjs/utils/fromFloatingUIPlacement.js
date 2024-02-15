"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFloatingUIPlacement", {
    enumerable: true,
    get: function() {
        return fromFloatingUIPlacement;
    }
});
const _parseFloatingUIPlacement = require("./parseFloatingUIPlacement");
const getPositionMap = ()=>({
        top: 'above',
        bottom: 'below',
        right: 'after',
        left: 'before'
    });
// Floating UI automatically flips alignment
// https://github.com/floating-ui/floating-ui/issues/1563
const getAlignmentMap = (position)=>{
    if (position === 'above' || position === 'below') {
        return {
            start: 'start',
            end: 'end'
        };
    }
    return {
        start: 'top',
        end: 'bottom'
    };
};
const fromFloatingUIPlacement = (placement)=>{
    const { side, alignment: floatingUIAlignment } = (0, _parseFloatingUIPlacement.parseFloatingUIPlacement)(placement);
    const position = getPositionMap()[side];
    const alignment = floatingUIAlignment && getAlignmentMap(position)[floatingUIAlignment];
    return {
        position,
        alignment
    };
};
