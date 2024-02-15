"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDrawerHeaderNavigation_unstable", {
    enumerable: true,
    get: function() {
        return useDrawerHeaderNavigation_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useDrawerHeaderNavigation_unstable = (props, ref)=>{
    return {
        components: {
            root: 'nav'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('nav', {
            ref,
            ...props
        }), {
            elementType: 'nav'
        })
    };
};
