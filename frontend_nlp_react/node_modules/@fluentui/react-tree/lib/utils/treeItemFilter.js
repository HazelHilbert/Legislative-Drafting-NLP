export const treeItemFilter = (element)=>{
    return element.getAttribute('role') === 'treeitem' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};
