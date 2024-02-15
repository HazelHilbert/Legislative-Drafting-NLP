export const scrollToItemStatic = (params)=>{
    const { index, itemSize, totalItems, scrollViewRef, axis = 'vertical', reversed = false, behavior = 'auto' } = params;
    if (axis === 'horizontal') {
        if (reversed) {
            var _scrollViewRef_current;
            (_scrollViewRef_current = scrollViewRef.current) === null || _scrollViewRef_current === void 0 ? void 0 : _scrollViewRef_current.scrollTo({
                left: totalItems * itemSize - itemSize * index,
                behavior
            });
        } else {
            var _scrollViewRef_current1;
            (_scrollViewRef_current1 = scrollViewRef.current) === null || _scrollViewRef_current1 === void 0 ? void 0 : _scrollViewRef_current1.scrollTo({
                left: itemSize * index,
                behavior
            });
        }
    } else {
        if (reversed) {
            var _scrollViewRef_current2;
            (_scrollViewRef_current2 = scrollViewRef.current) === null || _scrollViewRef_current2 === void 0 ? void 0 : _scrollViewRef_current2.scrollTo({
                top: totalItems * itemSize - itemSize * index,
                behavior
            });
        } else {
            var _scrollViewRef_current3;
            (_scrollViewRef_current3 = scrollViewRef.current) === null || _scrollViewRef_current3 === void 0 ? void 0 : _scrollViewRef_current3.scrollTo({
                top: itemSize * index,
                behavior
            });
        }
    }
};
