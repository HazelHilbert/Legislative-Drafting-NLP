"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "partitionBreadcrumbItems", {
    enumerable: true,
    get: function() {
        return partitionBreadcrumbItems;
    }
});
const DEFAULT_OVERFLOW_INDEX = 1;
const DEFAULT_MAX_DISPLAYED_ITEMS = 6;
const partitionBreadcrumbItems = (options)=>{
    let startDisplayedItems;
    let overflowItems;
    let endDisplayedItems;
    const { items = [] } = options;
    const itemsCount = items.length;
    const maxDisplayedItems = getMaxDisplayedItems(options.maxDisplayedItems);
    var _options_overflowIndex;
    let overflowIndex = (_options_overflowIndex = options.overflowIndex) !== null && _options_overflowIndex !== void 0 ? _options_overflowIndex : DEFAULT_OVERFLOW_INDEX;
    startDisplayedItems = items.slice(0, overflowIndex);
    const numberItemsToHide = itemsCount - maxDisplayedItems;
    if (numberItemsToHide > 0) {
        overflowIndex = overflowIndex >= maxDisplayedItems ? maxDisplayedItems - 1 : overflowIndex;
        const menuLastItemIdx = overflowIndex + numberItemsToHide;
        startDisplayedItems = startDisplayedItems.slice(0, overflowIndex);
        overflowItems = items.slice(overflowIndex, menuLastItemIdx);
        if (menuLastItemIdx < itemsCount) {
            endDisplayedItems = items.slice(menuLastItemIdx, itemsCount);
        }
    } else if (overflowIndex < itemsCount) {
        endDisplayedItems = items.slice(overflowIndex, itemsCount);
    }
    return {
        startDisplayedItems,
        overflowItems,
        endDisplayedItems
    };
};
function getMaxDisplayedItems(maxDisplayedItems) {
    return maxDisplayedItems && maxDisplayedItems >= 0 ? maxDisplayedItems : DEFAULT_MAX_DISPLAYED_ITEMS;
}
