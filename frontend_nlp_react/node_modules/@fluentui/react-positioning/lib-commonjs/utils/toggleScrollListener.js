"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toggleScrollListener", {
    enumerable: true,
    get: function() {
        return toggleScrollListener;
    }
});
const _reactutilities = require("@fluentui/react-utilities");
const _getScrollParent = require("./getScrollParent");
function toggleScrollListener(next, prev, handler) {
    if (next === prev) {
        return;
    }
    if ((0, _reactutilities.isHTMLElement)(prev)) {
        const prevScrollParent = (0, _getScrollParent.getScrollParent)(prev);
        prevScrollParent.removeEventListener('scroll', handler);
    }
    if ((0, _reactutilities.isHTMLElement)(next)) {
        const scrollParent = (0, _getScrollParent.getScrollParent)(next);
        scrollParent.addEventListener('scroll', handler);
    }
}
