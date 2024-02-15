"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderCompoundButton_unstable", {
    enumerable: true,
    get: function() {
        return renderCompoundButton_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderCompoundButton_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    const { iconOnly, iconPosition } = state;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            iconPosition !== 'after' && state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            !iconOnly && /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.contentContainer, {
                children: [
                    state.root.children,
                    state.secondaryContent && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.secondaryContent, {})
                ]
            }),
            iconPosition === 'after' && state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {})
        ]
    });
};
