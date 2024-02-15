"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCustomFocusIndicatorStyle", {
    enumerable: true,
    get: function() {
        return createCustomFocusIndicatorStyle;
    }
});
const _constants = require("./constants");
function createCustomFocusIndicatorStyle(style, { selector: selectorType = _constants.defaultOptions.selector, customizeSelector = _constants.defaultOptions.customizeSelector } = _constants.defaultOptions) {
    return {
        [customizeSelector(createBaseSelector(selectorType))]: style
    };
}
function createBaseSelector(selectorType) {
    switch(selectorType){
        case 'focus':
            return `&[${_constants.FOCUS_VISIBLE_ATTR}]`;
        case 'focus-within':
            return `&[${_constants.FOCUS_WITHIN_ATTR}]:focus-within`;
    }
}
