"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderButton_unstable", {
    enumerable: true,
    get: function() {
        return renderButton_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderButton_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    const { iconOnly, iconPosition } = state;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            iconPosition !== 'after' && state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            !iconOnly && state.root.children,
            iconPosition === 'after' && state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {})
        ]
    });
};
