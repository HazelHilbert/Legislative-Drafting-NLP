"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderAvatar_unstable", {
    enumerable: true,
    get: function() {
        return renderAvatar_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderAvatar_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.initials && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.initials, {}),
            state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            state.image && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.image, {}),
            state.badge && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.badge, {}),
            state.activeAriaLabelElement
        ]
    });
};
