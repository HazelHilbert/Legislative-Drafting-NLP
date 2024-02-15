"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderSkeleton_unstable", {
    enumerable: true,
    get: function() {
        return renderSkeleton_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _SkeletonContext = require("../../contexts/SkeletonContext");
const renderSkeleton_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_SkeletonContext.SkeletonContextProvider, {
        value: contextValues.skeletonGroup,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
