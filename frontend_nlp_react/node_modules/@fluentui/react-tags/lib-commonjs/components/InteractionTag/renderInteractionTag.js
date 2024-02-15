"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderInteractionTag_unstable", {
    enumerable: true,
    get: function() {
        return renderInteractionTag_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _interactionTagContext = require("../../contexts/interactionTagContext");
const renderInteractionTag_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_interactionTagContext.InteractionTagContextProvider, {
        value: contextValues.interactionTag,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
