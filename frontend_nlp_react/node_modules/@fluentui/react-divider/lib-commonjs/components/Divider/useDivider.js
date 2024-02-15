"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDivider_unstable", {
    enumerable: true,
    get: function() {
        return useDivider_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useDivider_unstable = (props, ref)=>{
    const { alignContent = 'center', appearance = 'default', inset = false, vertical = false, wrapper } = props;
    const dividerId = (0, _reactutilities.useId)('divider-');
    return {
        // Props passed at the top-level
        alignContent,
        appearance,
        inset,
        vertical,
        // Slots definition
        components: {
            root: 'div',
            wrapper: 'div'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            role: 'separator',
            'aria-orientation': vertical ? 'vertical' : 'horizontal',
            'aria-labelledby': props.children ? dividerId : undefined,
            ...props,
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref
        }), {
            elementType: 'div'
        }),
        wrapper: _reactutilities.slot.always(wrapper, {
            defaultProps: {
                id: dividerId,
                children: props.children
            },
            elementType: 'div'
        })
    };
};
