"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jsxSlot", {
    enumerable: true,
    get: function() {
        return jsxSlot;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _getMetadataFromSlotComponent = require("../utils/getMetadataFromSlotComponent");
const _Runtime = require("../utils/Runtime");
const jsxSlot = (type, overrideProps, key)=>{
    const { elementType, renderFunction, props: slotProps } = (0, _getMetadataFromSlotComponent.getMetadataFromSlotComponent)(type);
    const props = {
        ...slotProps,
        ...overrideProps
    };
    if (renderFunction) {
        return _Runtime.Runtime.jsx(_react.Fragment, {
            children: renderFunction(elementType, props)
        }, key);
    }
    return _Runtime.Runtime.jsx(elementType, props, key);
};
