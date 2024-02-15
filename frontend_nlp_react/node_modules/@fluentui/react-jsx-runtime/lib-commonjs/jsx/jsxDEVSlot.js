"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jsxDEVSlot", {
    enumerable: true,
    get: function() {
        return jsxDEVSlot;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _getMetadataFromSlotComponent = require("../utils/getMetadataFromSlotComponent");
const _DevRuntime = require("../utils/DevRuntime");
const jsxDEVSlot = (type, overrideProps, key, source, self)=>{
    const { elementType, renderFunction, props: slotProps } = (0, _getMetadataFromSlotComponent.getMetadataFromSlotComponent)(type);
    const props = {
        ...slotProps,
        ...overrideProps
    };
    if (renderFunction) {
        // if runtime is static
        if (source === true) {
            return _DevRuntime.DevRuntime.jsxDEV(_react.Fragment, {
                children: renderFunction(elementType, {
                    ...props,
                    /**
             * If the runtime is static then children is an array and this array won't be keyed.
             * Then we should wrap children by a static fragment
             * as there's no way to know if renderFunction will render statically or dynamically
             */ children: _DevRuntime.DevRuntime.jsxDEV(_react.Fragment, {
                        children: props.children
                    }, undefined, true, self)
                })
            }, key, false, self);
        }
        // if runtime is dynamic (source = false) things are simpler
        return _DevRuntime.DevRuntime.jsxDEV(_react.Fragment, {
            children: renderFunction(elementType, props)
        }, key, source, self);
    }
    return _DevRuntime.DevRuntime.jsxDEV(elementType, props, key, source, self);
};
