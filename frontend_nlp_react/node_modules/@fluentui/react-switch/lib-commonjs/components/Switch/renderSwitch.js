"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderSwitch_unstable", {
    enumerable: true,
    get: function() {
        return renderSwitch_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderSwitch_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    const { labelPosition } = state;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.input, {}),
            labelPosition !== 'after' && state.label && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.label, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.indicator, {}),
            labelPosition === 'after' && state.label && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.label, {})
        ]
    });
};
