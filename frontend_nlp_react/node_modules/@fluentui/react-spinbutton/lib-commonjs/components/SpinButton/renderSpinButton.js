"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderSpinButton_unstable", {
    enumerable: true,
    get: function() {
        return renderSpinButton_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderSpinButton_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.input, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.incrementButton, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.decrementButton, {})
        ]
    });
};
