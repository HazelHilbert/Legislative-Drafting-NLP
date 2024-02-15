"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTreeItemLayout_unstable", {
    enumerable: true,
    get: function() {
        return renderTreeItemLayout_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactbutton = require("@fluentui/react-button");
const renderTreeItemLayout_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.expandIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.expandIcon, {}),
            state.selector && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.selector, {}),
            state.iconBefore && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.iconBefore, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.main, {
                children: state.root.children
            }),
            state.iconAfter && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.iconAfter, {}),
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
