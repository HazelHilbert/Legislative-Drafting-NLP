"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderRadioGroup_unstable", {
    enumerable: true,
    get: function() {
        return renderRadioGroup_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _RadioGroupContext = require("../../contexts/RadioGroupContext");
const renderRadioGroup_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RadioGroupContext.RadioGroupContext.Provider, {
        value: contextValues.radioGroup,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
