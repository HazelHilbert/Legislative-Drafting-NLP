export const scrollToItemDynamic = (params)=>{
    const { index, itemSizes, totalSize, scrollViewRef, axis = 'vertical', reversed = false, behavior = 'auto' } = params;
    if (!itemSizes.current) {
        return;
    }
    if (itemSizes.current === null || itemSizes.current.length < index) {
        // null check - abort
        return;
    }
    let itemDepth = 0;
    for(let i = 0; i < index; i++){
        if (i < index) {
            itemDepth += itemSizes.current[i];
        }
    }
    if (axis === 'horizontal') {
        if (reversed) {
            var _scrollViewRef_current;
            (_scrollViewRef_current = scrollViewRef.current) === null || _scrollViewRef_current === void 0 ? void 0 : _scrollViewRef_current.scrollTo({
                left: totalSize - itemDepth,
                behavior
            });
        } else {
            var _scrollViewRef_current1;
            (_scrollViewRef_current1 = scrollViewRef.current) === null || _scrollViewRef_current1 === void 0 ? void 0 : _scrollViewRef_current1.scrollTo({
                left: itemDepth,
                behavior
            });
        }
    } else {
        if (reversed) {
            var _scrollViewRef_current2;
            (_scrollViewRef_current2 = scrollViewRef.current) === null || _scrollViewRef_current2 === void 0 ? void 0 : _scrollViewRef_current2.scrollTo({
                top: totalSize - itemDepth,
                behavior
            });
        } else {
            var _scrollViewRef_current3;
            (_scrollViewRef_current3 = scrollViewRef.current) === null || _scrollViewRef_current3 === void 0 ? void 0 : _scrollViewRef_current3.scrollTo({
                top: itemDepth,
                behavior
            });
        }
    }
};
