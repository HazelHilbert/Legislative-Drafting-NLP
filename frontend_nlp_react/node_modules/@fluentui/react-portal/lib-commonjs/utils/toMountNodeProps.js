"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toMountNodeProps", {
    enumerable: true,
    get: function() {
        return toMountNodeProps;
    }
});
const _reactutilities = require("@fluentui/react-utilities");
function toMountNodeProps(mountNode) {
    if ((0, _reactutilities.isHTMLElement)(mountNode)) {
        return {
            element: mountNode
        };
    }
    if (typeof mountNode === 'object') {
        if (mountNode === null) {
            return {
                element: null
            };
        }
        return mountNode;
    }
    return {};
}
