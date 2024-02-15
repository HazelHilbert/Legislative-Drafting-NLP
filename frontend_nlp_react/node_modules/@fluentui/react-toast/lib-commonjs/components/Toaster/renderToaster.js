"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderToaster_unstable", {
    enumerable: true,
    get: function() {
        return renderToaster_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactportal = require("@fluentui/react-portal");
const _AriaLive = require("../AriaLive");
const renderToaster_unstable = (state)=>{
    const { announceRef, renderAriaLive, inline, mountNode } = state;
    (0, _reactutilities.assertSlots)(state);
    const hasToasts = !!state.bottomStart || !!state.bottomEnd || !!state.topStart || !!state.topEnd || !!state.top || !!state.bottom;
    const ariaLive = renderAriaLive ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_AriaLive.AriaLive, {
        announceRef: announceRef
    }) : null;
    const positionSlots = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            state.bottom ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.bottom, {}) : null,
            state.bottomStart ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.bottomStart, {}) : null,
            state.bottomEnd ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.bottomEnd, {}) : null,
            state.topStart ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.topStart, {}) : null,
            state.topEnd ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.topEnd, {}) : null,
            state.top ? /*#__PURE__*/ (0, _jsxruntime.jsx)(state.top, {}) : null
        ]
    });
    if (inline) {
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                ariaLive,
                hasToasts ? positionSlots : null
            ]
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            ariaLive,
            hasToasts ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactportal.Portal, {
                mountNode: mountNode,
                children: positionSlots
            }) : null
        ]
    });
};
