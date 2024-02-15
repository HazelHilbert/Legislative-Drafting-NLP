"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAccordionContextValues_unstable", {
    enumerable: true,
    get: function() {
        return useAccordionContextValues_unstable;
    }
});
function useAccordionContextValues_unstable(state) {
    const { navigation, openItems, requestToggle, multiple, collapsible } = state;
    // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
    const accordion = {
        navigation,
        openItems,
        requestToggle,
        collapsible,
        multiple
    };
    return {
        accordion
    };
}
