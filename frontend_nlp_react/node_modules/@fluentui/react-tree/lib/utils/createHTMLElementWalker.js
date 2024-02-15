import { isHTMLElement } from '@fluentui/react-utilities';
export function createHTMLElementWalker(root, targetDocument, filter = ()=>NodeFilter.FILTER_ACCEPT) {
    let temporaryFilter;
    const treeWalker = targetDocument.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
        acceptNode (node) {
            if (!isHTMLElement(node)) {
                return NodeFilter.FILTER_REJECT;
            }
            const filterResult = filter(node);
            var _temporaryFilter;
            return filterResult === NodeFilter.FILTER_ACCEPT ? (_temporaryFilter = temporaryFilter === null || temporaryFilter === void 0 ? void 0 : temporaryFilter(node)) !== null && _temporaryFilter !== void 0 ? _temporaryFilter : filterResult : filterResult;
        }
    });
    return {
        get root () {
            return treeWalker.root;
        },
        get currentElement () {
            return treeWalker.currentNode;
        },
        set currentElement (element){
            treeWalker.currentNode = element;
        },
        firstChild: (localFilter)=>{
            temporaryFilter = localFilter;
            const result = treeWalker.firstChild();
            temporaryFilter = undefined;
            return result;
        },
        lastChild: (localFilter)=>{
            temporaryFilter = localFilter;
            const result = treeWalker.lastChild();
            temporaryFilter = undefined;
            return result;
        },
        nextElement: (localFilter)=>{
            temporaryFilter = localFilter;
            const result = treeWalker.nextNode();
            temporaryFilter = undefined;
            return result;
        },
        nextSibling: (localFilter)=>{
            temporaryFilter = localFilter;
            const result = treeWalker.nextSibling();
            temporaryFilter = undefined;
            return result;
        },
        parentElement: (localFilter)=>{
            temporaryFilter = localFilter;
            const result = treeWalker.parentNode();
            temporaryFilter = undefined;
            return result;
        },
        previousElement: (localFilter)=>{
            temporaryFilter = localFilter;
            const result = treeWalker.previousNode();
            temporaryFilter = undefined;
            return result;
        },
        previousSibling: (localFilter)=>{
            temporaryFilter = localFilter;
            const result = treeWalker.previousSibling();
            temporaryFilter = undefined;
            return result;
        }
    };
}
