export const dataTreeItemValueAttrName = 'data-fui-tree-item-value';
export const getTreeItemValueFromElement = (element)=>{
    return element.getAttribute(dataTreeItemValueAttrName);
};
