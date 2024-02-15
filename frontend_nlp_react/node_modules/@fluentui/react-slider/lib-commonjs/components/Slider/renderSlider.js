"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderSlider_unstable", {
    enumerable: true,
    get: function() {
        return renderSlider_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderSlider_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.input, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.rail, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.thumb, {})
        ]
    });
};
