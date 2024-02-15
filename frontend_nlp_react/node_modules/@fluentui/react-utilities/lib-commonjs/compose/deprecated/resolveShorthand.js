"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveShorthand", {
    enumerable: true,
    get: function() {
        return resolveShorthand;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _slot = /*#__PURE__*/ _interop_require_wildcard._(require("../slot"));
const resolveShorthand = (value, options)=>_slot.optional(value, {
        ...options,
        renderByDefault: options === null || options === void 0 ? void 0 : options.required,
        // elementType as undefined is the way to identify between a slot and a resolveShorthand call
        // in the case elementType is undefined assertSlots will fail, ensuring it'll only work with slot method.
        elementType: undefined
    });
