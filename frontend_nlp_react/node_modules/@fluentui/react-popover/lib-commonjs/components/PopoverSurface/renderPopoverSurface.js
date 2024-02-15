"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderPopoverSurface_unstable", {
    enumerable: true,
    get: function() {
        return renderPopoverSurface_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactportal = require("@fluentui/react-portal");
const renderPopoverSurface_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    const surface = /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.withArrow && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                ref: state.arrowRef,
                className: state.arrowClassName
            }),
            state.root.children
        ]
    });
    if (state.inline) {
        return surface;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactportal.Portal, {
        mountNode: state.mountNode,
        children: surface
    });
};
