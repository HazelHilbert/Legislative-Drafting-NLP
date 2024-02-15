"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertIsDefinedRef", {
    enumerable: true,
    get: function() {
        return assertIsDefinedRef;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function assertIsDefinedRef(refObject, msg = `assertIsDefinedRef: reference not properly defined ${refObject}`) {
    // eslint-disable-next-line eqeqeq
    if (refObject.current == undefined && process.env.NODE_ENV === 'development') {
        throw new TypeError(msg);
    }
}
