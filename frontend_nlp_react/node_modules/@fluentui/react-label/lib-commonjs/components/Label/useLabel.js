"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useLabel_unstable", {
    enumerable: true,
    get: function() {
        return useLabel_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useLabel_unstable = (props, ref)=>{
    const { disabled = false, required = false, weight = 'regular', size = 'medium' } = props;
    return {
        disabled,
        required: _reactutilities.slot.optional(required === true ? '*' : required || undefined, {
            defaultProps: {
                'aria-hidden': 'true'
            },
            elementType: 'span'
        }),
        weight,
        size,
        components: {
            root: 'label',
            required: 'span'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('label', {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLLabelElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            ...props
        }), {
            elementType: 'label'
        })
    };
};
