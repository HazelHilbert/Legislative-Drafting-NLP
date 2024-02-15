"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderMenuButton_unstable", {
    enumerable: true,
    get: function() {
        return renderMenuButton_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderMenuButton_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    const { icon, iconOnly } = state;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            !iconOnly && state.root.children,
            (!iconOnly || !(icon === null || icon === void 0 ? void 0 : icon.children)) && state.menuIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.menuIcon, {})
        ]
    });
};
