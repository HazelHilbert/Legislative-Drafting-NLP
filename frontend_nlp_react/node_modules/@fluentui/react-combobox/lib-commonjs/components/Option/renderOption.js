"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderOption_unstable", {
    enumerable: true,
    get: function() {
        return renderOption_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderOption_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.checkIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.checkIcon, {}),
            state.root.children
        ]
    });
};
