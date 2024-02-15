"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderInteractionTagPrimary_unstable", {
    enumerable: true,
    get: function() {
        return renderInteractionTagPrimary_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactavatar = require("@fluentui/react-avatar");
const renderInteractionTagPrimary_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.media && /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactavatar.AvatarContextProvider, {
                value: contextValues.avatar,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.media, {})
            }),
            state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
            state.primaryText && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.primaryText, {}),
            state.secondaryText && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.secondaryText, {})
        ]
    });
};
