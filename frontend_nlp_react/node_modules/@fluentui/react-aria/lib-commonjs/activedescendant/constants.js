/**
 * Applied to the element that is active descendant
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ACTIVEDESCENDANT_ATTRIBUTE: function() {
        return ACTIVEDESCENDANT_ATTRIBUTE;
    },
    ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE: function() {
        return ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE;
    }
});
const ACTIVEDESCENDANT_ATTRIBUTE = 'data-activedescendant';
const ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE = 'data-activedescendant-focusvisible';
