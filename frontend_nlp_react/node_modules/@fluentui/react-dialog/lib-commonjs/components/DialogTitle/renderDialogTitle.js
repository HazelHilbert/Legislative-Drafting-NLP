"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderDialogTitle_unstable", {
    enumerable: true,
    get: function() {
        return renderDialogTitle_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderDialogTitle_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
                children: state.root.children
            }),
            state.action && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.action, {})
        ]
    });
};
