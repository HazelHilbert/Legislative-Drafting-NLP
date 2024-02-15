"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderBadge_unstable", {
    enumerable: true,
    get: function() {
        return renderBadge_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderBadge_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.iconPosition === 'before' && state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            state.root.children,
            state.iconPosition === 'after' && state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {})
        ]
    });
};
