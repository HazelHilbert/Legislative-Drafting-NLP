"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMenuGroup_unstable", {
    enumerable: true,
    get: function() {
        return useMenuGroup_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
function useMenuGroup_unstable(props, ref) {
    const headerId = (0, _reactutilities.useId)('menu-group');
    return {
        components: {
            root: 'div'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            'aria-labelledby': headerId,
            role: 'group',
            ...props
        }), {
            elementType: 'div'
        }),
        headerId
    };
}
