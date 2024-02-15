"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "listScrollParents", {
    enumerable: true,
    get: function() {
        return listScrollParents;
    }
});
const _getScrollParent = require("./getScrollParent");
function listScrollParents(node) {
    const scrollParents = [];
    let cur = node;
    while(cur){
        const scrollParent = (0, _getScrollParent.getScrollParent)(cur);
        if (node.ownerDocument.body === scrollParent) {
            scrollParents.push(scrollParent);
            break;
        }
        if (scrollParent.nodeName === 'BODY' && scrollParent !== node.ownerDocument.body) {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.error('@fluentui/react-positioning: You are comparing two different documents! This is an unexpected error, please report this as a bug to the Fluent UI team ');
            }
            break;
        }
        scrollParents.push(scrollParent);
        cur = scrollParent;
    }
    return scrollParents;
}
