"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderProgressBar_unstable", {
    enumerable: true,
    get: function() {
        return renderProgressBar_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderProgressBar_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: state.bar && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.bar, {})
    });
};
