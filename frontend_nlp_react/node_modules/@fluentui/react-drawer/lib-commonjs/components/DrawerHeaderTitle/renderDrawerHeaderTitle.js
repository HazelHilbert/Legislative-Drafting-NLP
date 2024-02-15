"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderDrawerHeaderTitle_unstable", {
    enumerable: true,
    get: function() {
        return renderDrawerHeaderTitle_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderDrawerHeaderTitle_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.heading && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.heading, {}),
            state.action && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.action, {})
        ]
    });
};
