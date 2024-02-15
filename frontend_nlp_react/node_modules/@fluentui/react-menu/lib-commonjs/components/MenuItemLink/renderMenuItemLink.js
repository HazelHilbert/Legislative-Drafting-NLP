"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderMenuItemLink_unstable", {
    enumerable: true,
    get: function() {
        return renderMenuItemLink_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderMenuItemLink_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    // TODO Add additional slots in the appropriate place
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.checkmark && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.checkmark, {}),
            state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            state.content && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.content, {}),
            state.secondaryContent && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.secondaryContent, {})
        ]
    });
};
