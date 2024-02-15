"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderSplitButton_unstable", {
    enumerable: true,
    get: function() {
        return renderSplitButton_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderSplitButton_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.primaryActionButton && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.primaryActionButton, {}),
            state.menuButton && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.menuButton, {})
        ]
    });
};
