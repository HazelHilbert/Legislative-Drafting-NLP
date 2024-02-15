"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useImage_unstable", {
    enumerable: true,
    get: function() {
        return useImage_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useImage_unstable = (props, ref)=>{
    const { bordered = false, fit = 'default', block = false, shape = 'square', shadow = false } = props;
    const state = {
        bordered,
        fit,
        block,
        shape,
        shadow,
        components: {
            root: 'img'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('img', {
            ref,
            ...props
        }), {
            elementType: 'img'
        })
    };
    return state;
};
