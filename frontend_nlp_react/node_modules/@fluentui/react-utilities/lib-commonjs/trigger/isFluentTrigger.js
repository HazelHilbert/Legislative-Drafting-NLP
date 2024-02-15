"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFluentTrigger", {
    enumerable: true,
    get: function() {
        return isFluentTrigger;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function isFluentTrigger(element) {
    return Boolean(element.type.isFluentTriggerComponent);
}
