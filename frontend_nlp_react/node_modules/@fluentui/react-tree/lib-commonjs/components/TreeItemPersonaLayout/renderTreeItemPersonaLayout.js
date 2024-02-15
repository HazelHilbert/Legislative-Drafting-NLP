"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTreeItemPersonaLayout_unstable", {
    enumerable: true,
    get: function() {
        return renderTreeItemPersonaLayout_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactavatar = require("@fluentui/react-avatar");
const _reactbutton = require("@fluentui/react-button");
const renderTreeItemPersonaLayout_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.expandIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.expandIcon, {}),
            state.selector && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.selector, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactavatar.AvatarContextProvider, {
                value: contextValues.avatar,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.media, {})
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.main, {}),
            state.description && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.description, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_reactbutton.ButtonContextProvider, {
                value: state.buttonContextValue,
                children: [
                    state.actions && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.actions, {}),
                    state.aside && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.aside, {})
                ]
            })
        ]
    });
};
