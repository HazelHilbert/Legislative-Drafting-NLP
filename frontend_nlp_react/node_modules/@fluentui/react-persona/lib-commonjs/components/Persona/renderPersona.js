"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderPersona_unstable", {
    enumerable: true,
    get: function() {
        return renderPersona_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderPersona_unstable = (state)=>{
    const { presenceOnly, textPosition } = state;
    (0, _reactutilities.assertSlots)(state);
    const coin = presenceOnly ? state.presence && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.presence, {}) : state.avatar && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.avatar, {});
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            (textPosition === 'after' || textPosition === 'below') && coin,
            state.primaryText && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.primaryText, {}),
            state.secondaryText && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.secondaryText, {}),
            state.tertiaryText && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.tertiaryText, {}),
            state.quaternaryText && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.quaternaryText, {}),
            textPosition === 'before' && coin
        ]
    });
};
