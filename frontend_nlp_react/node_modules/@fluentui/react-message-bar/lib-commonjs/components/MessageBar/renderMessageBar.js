"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderMessageBar_unstable", {
    enumerable: true,
    get: function() {
        return renderMessageBar_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _messageBarContext = require("../../contexts/messageBarContext");
const renderMessageBar_unstable = (state, contexts)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_messageBarContext.MessageBarContextProvider, {
        value: contexts.messageBar,
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
            children: [
                state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
                state.root.children,
                state.bottomReflowSpacer && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.bottomReflowSpacer, {})
            ]
        })
    });
};
