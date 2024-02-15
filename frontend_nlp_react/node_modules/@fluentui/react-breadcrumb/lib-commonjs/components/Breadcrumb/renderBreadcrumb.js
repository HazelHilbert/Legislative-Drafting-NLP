"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderBreadcrumb_unstable", {
    enumerable: true,
    get: function() {
        return renderBreadcrumb_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _BreadcrumbContext = require("./BreadcrumbContext");
const renderBreadcrumb_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_BreadcrumbContext.BreadcrumbProvider, {
            value: contextValues,
            children: state.list && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.list, {
                children: state.root.children
            })
        })
    });
};
