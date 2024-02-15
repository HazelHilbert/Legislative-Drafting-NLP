"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderAvatarGroupPopover_unstable", {
    enumerable: true,
    get: function() {
        return renderAvatarGroupPopover_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _AvatarGroupContext = require("../../contexts/AvatarGroupContext");
const _reactutilities = require("@fluentui/react-utilities");
const _reactpopover = require("@fluentui/react-popover");
const renderAvatarGroupPopover_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactpopover.PopoverTrigger, {
                disableButtonEnhancement: true,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.tooltip, {
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.triggerButton, {})
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(state.popoverSurface, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_AvatarGroupContext.AvatarGroupProvider, {
                    value: contextValues.avatarGroup,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.content, {})
                })
            })
        ]
    });
};
