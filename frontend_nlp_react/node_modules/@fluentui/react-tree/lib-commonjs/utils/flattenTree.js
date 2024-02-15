"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "flattenTree_unstable", {
    enumerable: true,
    get: function() {
        return flattenTree_unstable;
    }
});
function flattenTreeRecursive(items, parent, level = 1) {
    return items.reduce((acc, { subtree, ...item }, index)=>{
        const flatTreeItem = {
            'aria-level': level,
            'aria-posinset': index + 1,
            'aria-setsize': items.length,
            parentValue: parent === null || parent === void 0 ? void 0 : parent.value,
            ...item
        };
        acc.push(flatTreeItem);
        if (subtree !== undefined) {
            acc.push(...flattenTreeRecursive(subtree, flatTreeItem, level + 1));
        }
        return acc;
    }, []);
}
const flattenTree_unstable = (items)=>flattenTreeRecursive(items);
