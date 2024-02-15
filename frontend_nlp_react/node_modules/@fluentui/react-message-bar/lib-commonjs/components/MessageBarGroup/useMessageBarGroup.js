"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMessageBarGroup_unstable", {
    enumerable: true,
    get: function() {
        return useMessageBarGroup_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useMessageBarGroup_unstable = (props, ref)=>{
    if (process.env.NODE_ENV !== 'production') {
        _react.Children.forEach(props.children, (c)=>{
            if (!/*#__PURE__*/ _react.isValidElement(c) || c.type === _react.Fragment) {
                throw new Error("MessageBarGroup: children must be valid MessageBar components. Please ensure you're not using fragments. ");
            }
        });
    }
    var _props_children;
    const children = _react.Children.map((_props_children = props.children) !== null && _props_children !== void 0 ? _props_children : [], (c)=>/*#__PURE__*/ _react.isValidElement(c) && c.type !== _react.Fragment ? c : null).filter(Boolean);
    var _props_animate;
    return {
        components: {
            root: 'div'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            ref,
            ...props
        }), {
            elementType: 'div'
        }),
        children,
        animate: (_props_animate = props.animate) !== null && _props_animate !== void 0 ? _props_animate : 'exit-only',
        enterStyles: '',
        exitStyles: ''
    };
};
