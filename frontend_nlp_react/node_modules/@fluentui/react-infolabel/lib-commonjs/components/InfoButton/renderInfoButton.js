"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderInfoButton_unstable", {
    enumerable: true,
    get: function() {
        return renderInfoButton_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactpopover = require("@fluentui/react-popover");
const renderInfoButton_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.popover, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactpopover.PopoverTrigger, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.info, {})
        ]
    });
};
