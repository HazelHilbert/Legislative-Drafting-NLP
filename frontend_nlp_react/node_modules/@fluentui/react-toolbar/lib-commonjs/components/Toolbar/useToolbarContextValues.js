"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useToolbarContextValues_unstable", {
    enumerable: true,
    get: function() {
        return useToolbarContextValues_unstable;
    }
});
function useToolbarContextValues_unstable(state) {
    const { size, handleToggleButton, vertical, checkedValues, handleRadio } = state;
    // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
    const toolbar = {
        size,
        vertical,
        handleToggleButton,
        handleRadio,
        checkedValues
    };
    return {
        toolbar
    };
}
