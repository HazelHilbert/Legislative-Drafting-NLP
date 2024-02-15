const DEFAULT_OVERFLOW_INDEX = 1;
const DEFAULT_MAX_DISPLAYED_ITEMS = 6;
/**
 * Get the displayed items and overflowing items based on the array of BreadcrumbItems needed for Breadcrumb.
 *
 * @param options - Configure the partition options
 *
 * @returns Three arrays split into displayed items and overflow items based on maxDisplayedItems.
 */ export const partitionBreadcrumbItems = (options)=>{
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
