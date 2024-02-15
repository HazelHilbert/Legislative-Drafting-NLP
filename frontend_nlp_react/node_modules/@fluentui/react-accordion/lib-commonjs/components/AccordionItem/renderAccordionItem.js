"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderAccordionItem_unstable", {
    enumerable: true,
    get: function() {
        return renderAccordionItem_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _accordionItem = require("../../contexts/accordionItem");
const renderAccordionItem_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_accordionItem.AccordionItemProvider, {
            value: contextValues.accordionItem,
            children: state.root.children
        })
    });
};
