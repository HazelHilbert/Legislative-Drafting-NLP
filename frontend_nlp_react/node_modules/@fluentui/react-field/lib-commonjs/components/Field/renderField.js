"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderField_unstable", {
    enumerable: true,
    get: function() {
        return renderField_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _index = require("../../contexts/index");
const renderField_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    let { children } = state;
    if (typeof children === 'function') {
        children = children((0, _index.getFieldControlProps)(contextValues.field) || {});
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_index.FieldContextProvider, {
        value: contextValues === null || contextValues === void 0 ? void 0 : contextValues.field,
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
            children: [
                state.label && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.label, {}),
                children,
                state.validationMessage && /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.validationMessage, {
                    children: [
                        state.validationMessageIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.validationMessageIcon, {}),
                        state.validationMessage.children
                    ]
                }),
                state.hint && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.hint, {})
            ]
        })
    });
};
