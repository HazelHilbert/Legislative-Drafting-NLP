"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTab_unstable", {
    enumerable: true,
    get: function() {
        return renderTab_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderTab_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            !state.iconOnly && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.content, {}),
            state.contentReservedSpace && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.contentReservedSpace, {})
        ]
    });
};
