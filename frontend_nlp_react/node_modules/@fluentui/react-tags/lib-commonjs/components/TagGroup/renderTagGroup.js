"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTagGroup_unstable", {
    enumerable: true,
    get: function() {
        return renderTagGroup_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _tagGroupContext = require("../../contexts/tagGroupContext");
const renderTagGroup_unstable = (state, contextValue)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_tagGroupContext.TagGroupContextProvider, {
        value: contextValue.tagGroup,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
