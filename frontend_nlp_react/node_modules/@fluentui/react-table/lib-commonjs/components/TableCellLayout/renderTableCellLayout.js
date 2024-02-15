"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTableCellLayout_unstable", {
    enumerable: true,
    get: function() {
        return renderTableCellLayout_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactavatar = require("@fluentui/react-avatar");
const renderTableCellLayout_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.media && /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactavatar.AvatarContextProvider, {
                value: contextValues.avatar,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.media, {})
            }),
            state.content && /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.content, {
                children: [
                    state.main && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.main, {
                        children: state.root.children
                    }),
                    state.description && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.description, {})
                ]
            })
        ]
    });
};
