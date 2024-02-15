"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderDivider_unstable", {
    enumerable: true,
    get: function() {
        return renderDivider_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const renderDivider_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: state.root.children !== undefined && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.wrapper, {
            children: state.root.children
        })
    });
};
