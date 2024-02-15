"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderToast_unstable", {
    enumerable: true,
    get: function() {
        return renderToast_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _reactsharedcontexts = require("@fluentui/react-shared-contexts");
const renderToast_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactsharedcontexts.BackgroundAppearanceProvider, {
        value: contextValues.backgroundAppearance,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
