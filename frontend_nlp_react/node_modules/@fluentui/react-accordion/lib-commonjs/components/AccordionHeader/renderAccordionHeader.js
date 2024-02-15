"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderAccordionHeader_unstable", {
    enumerable: true,
    get: function() {
        return renderAccordionHeader_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _accordionHeader = require("../../contexts/accordionHeader");
const renderAccordionHeader_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_accordionHeader.AccordionHeaderProvider, {
        value: contextValues.accordionHeader,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.button, {
                children: [
                    state.expandIconPosition === 'start' && state.expandIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.expandIcon, {}),
                    state.icon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.icon, {}),
                    state.root.children,
                    state.expandIconPosition === 'end' && state.expandIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.expandIcon, {})
                ]
            })
        })
    });
};
