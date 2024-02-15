"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderToolbar_unstable", {
    enumerable: true,
    get: function() {
        return renderToolbar_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _ToolbarContext = require("./ToolbarContext");
const renderToolbar_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_ToolbarContext.ToolbarContext.Provider, {
        value: contextValues.toolbar,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
            children: state.root.children
        })
    });
};
