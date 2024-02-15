"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    dataTreeItemValueAttrName: function() {
        return dataTreeItemValueAttrName;
    },
    getTreeItemValueFromElement: function() {
        return getTreeItemValueFromElement;
    }
});
const dataTreeItemValueAttrName = 'data-fui-tree-item-value';
const getTreeItemValueFromElement = (element)=>{
    return element.getAttribute(dataTreeItemValueAttrName);
};
