"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "treeItemFilter", {
    enumerable: true,
    get: function() {
        return treeItemFilter;
    }
});
const treeItemFilter = (element)=>{
    return element.getAttribute('role') === 'treeitem' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};
