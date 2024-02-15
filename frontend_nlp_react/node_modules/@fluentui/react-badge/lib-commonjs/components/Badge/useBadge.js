"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useBadge_unstable", {
    enumerable: true,
    get: function() {
        return useBadge_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useBadge_unstable = (props, ref)=>{
    const { shape = 'circular', size = 'medium', iconPosition = 'before', appearance = 'filled', color = 'brand' } = props;
    const state = {
        shape,
        size,
        iconPosition,
        appearance,
        color,
        components: {
            root: 'div',
            icon: 'span'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            ...props
        }), {
            elementType: 'div'
        }),
        icon: _reactutilities.slot.optional(props.icon, {
            elementType: 'span'
        })
    };
    return state;
};
