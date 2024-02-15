"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jsxsSlot", {
    enumerable: true,
    get: function() {
        return jsxsSlot;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _getMetadataFromSlotComponent = require("../utils/getMetadataFromSlotComponent");
const _Runtime = require("../utils/Runtime");
const jsxsSlot = (type, overrideProps, key)=>{
    const { elementType, renderFunction, props: slotProps } = (0, _getMetadataFromSlotComponent.getMetadataFromSlotComponent)(type);
    const props = {
        ...slotProps,
        ...overrideProps
    };
    if (renderFunction) {
        /**
     * In static runtime then children is an array and this array won't be keyed.
     * We should wrap children by a static fragment
     * as there's no way to know if renderFunction will render statically or dynamically
     */ return _Runtime.Runtime.jsx(_react.Fragment, {
            children: renderFunction(elementType, {
                ...props,
                children: _Runtime.Runtime.jsxs(_react.Fragment, {
                    children: props.children
                }, undefined)
            })
        }, key);
    }
    return _Runtime.Runtime.jsxs(elementType, props, key);
};
