"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTabListContextValues_unstable", {
    enumerable: true,
    get: function() {
        return useTabListContextValues_unstable;
    }
});
function useTabListContextValues_unstable(state) {
    const { appearance, reserveSelectedTabSpace, disabled, selectTabOnFocus, selectedValue: selectedKey, onRegister, onUnregister, onSelect, getRegisteredTabs, size, vertical } = state;
    const tabList = {
        appearance,
        reserveSelectedTabSpace,
        disabled,
        selectTabOnFocus,
        selectedValue: selectedKey,
        onSelect,
        onRegister,
        onUnregister,
        getRegisteredTabs,
        size,
        vertical
    };
    return {
        tabList
    };
}
