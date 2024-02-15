"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTableSelectionCell_unstable", {
    enumerable: true,
    get: function() {
        return renderTableSelectionCell_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderTableSelectionCell_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.type === 'checkbox' && state.checkboxIndicator && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.checkboxIndicator, {}),
            state.type === 'radio' && state.radioIndicator && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.radioIndicator, {})
        ]
    });
};
