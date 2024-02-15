"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderToastTitle_unstable", {
    enumerable: true,
    get: function() {
        return renderToastTitle_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderToastTitle_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            state.media ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.media, {}) : null,
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {}),
            state.action ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.action, {}) : null
        ]
    });
};
