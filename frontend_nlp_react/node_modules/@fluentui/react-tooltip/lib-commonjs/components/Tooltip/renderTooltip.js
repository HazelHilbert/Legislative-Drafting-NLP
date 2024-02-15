"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTooltip_unstable", {
    enumerable: true,
    get: function() {
        return renderTooltip_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactportal = require("@fluentui/react-portal");
const _reactutilities = require("@fluentui/react-utilities");
const renderTooltip_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            state.children,
            state.shouldRenderTooltip && /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactportal.Portal, {
                mountNode: state.mountNode,
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.content, {
                    children: [
                        state.withArrow && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                            ref: state.arrowRef,
                            className: state.arrowClassName
                        }),
                        state.content.children
                    ]
                })
            })
        ]
    });
};
