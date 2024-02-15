/**
 * AutoSizes contains many options from historic implementation.
 * Now options 'always'/'height-always'/'width-always' are obsolete.
 * This function maps them to true/'height'/'width'
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizeAutoSize", {
    enumerable: true,
    get: function() {
        return normalizeAutoSize;
    }
});
const normalizeAutoSize = (autoSize)=>{
    switch(autoSize){
        case 'always':
        case true:
            return {
                applyMaxWidth: true,
                applyMaxHeight: true
            };
        case 'width-always':
        case 'width':
            return {
                applyMaxWidth: true,
                applyMaxHeight: false
            };
        case 'height-always':
        case 'height':
            return {
                applyMaxWidth: false,
                applyMaxHeight: true
            };
        default:
            return false;
    }
};
