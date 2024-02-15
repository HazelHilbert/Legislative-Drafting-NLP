"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderAccordion_unstable", {
    enumerable: true,
    get: function() {
        return renderAccordion_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _accordion = require("../../contexts/accordion");
const renderAccordion_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_accordion.AccordionProvider, {
            value: contextValues.accordion,
            children: state.root.children
        })
    });
};
