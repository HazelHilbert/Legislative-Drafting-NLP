"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTable_unstable", {
    enumerable: true,
    get: function() {
        return useTable_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useTable_unstable = (props, ref)=>{
    var _props_as;
    const rootComponent = ((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : props.noNativeElements) ? 'div' : 'table';
    var _props_size, _props_noNativeElements, _props_sortable;
    return {
        components: {
            root: rootComponent
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)(rootComponent, {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            role: rootComponent === 'div' ? 'table' : undefined,
            ...props
        }), {
            elementType: rootComponent
        }),
        size: (_props_size = props.size) !== null && _props_size !== void 0 ? _props_size : 'medium',
        noNativeElements: (_props_noNativeElements = props.noNativeElements) !== null && _props_noNativeElements !== void 0 ? _props_noNativeElements : false,
        sortable: (_props_sortable = props.sortable) !== null && _props_sortable !== void 0 ? _props_sortable : false
    };
};
