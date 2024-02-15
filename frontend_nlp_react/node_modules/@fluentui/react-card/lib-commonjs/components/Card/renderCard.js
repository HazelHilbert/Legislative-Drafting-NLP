"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderCard_unstable", {
    enumerable: true,
    get: function() {
        return renderCard_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _CardContext = require("./CardContext");
const renderCard_unstable = (state, cardContextValue)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_CardContext.CardProvider, {
            value: cardContextValue,
            children: [
                state.checkbox ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.checkbox, {}) : null,
                state.floatingAction ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.floatingAction, {}) : null,
                state.root.children
            ]
        })
    });
};
