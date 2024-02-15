"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useOptionGroup_unstable", {
    enumerable: true,
    get: function() {
        return useOptionGroup_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useOptionGroup_unstable = (props, ref)=>{
    const labelId = (0, _reactutilities.useId)('group-label');
    const { label } = props;
    return {
        components: {
            root: 'div',
            label: 'span'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            role: 'group',
            'aria-labelledby': label ? labelId : undefined,
            ...props
        }), {
            elementType: 'div'
        }),
        label: _reactutilities.slot.optional(label, {
            defaultProps: {
                id: labelId,
                role: 'presentation'
            },
            elementType: 'span'
        })
    };
};
