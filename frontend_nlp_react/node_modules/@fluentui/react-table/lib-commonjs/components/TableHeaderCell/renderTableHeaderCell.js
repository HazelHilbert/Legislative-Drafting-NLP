"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTableHeaderCell_unstable", {
    enumerable: true,
    get: function() {
        return renderTableHeaderCell_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderTableHeaderCell_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.button, {
                children: [
                    state.root.children,
                    state.sortIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.sortIcon, {})
                ]
            }),
            state.aside && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.aside, {})
        ]
    });
};
