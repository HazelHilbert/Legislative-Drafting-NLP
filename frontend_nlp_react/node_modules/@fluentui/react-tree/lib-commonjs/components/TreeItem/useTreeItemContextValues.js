"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTreeItemContextValues_unstable", {
    enumerable: true,
    get: function() {
        return useTreeItemContextValues_unstable;
    }
});
function useTreeItemContextValues_unstable(state) {
    const { value, itemType, layoutRef, subtreeRef, open, expandIconRef, actionsRef, treeItemRef, isActionsVisible, isAsideVisible, selectionRef, checked } = state;
    /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */ const treeItem = {
        value,
        checked,
        itemType,
        layoutRef,
        subtreeRef,
        open,
        selectionRef,
        isActionsVisible,
        isAsideVisible,
        actionsRef,
        treeItemRef,
        expandIconRef
    };
    return {
        treeItem
    };
}
