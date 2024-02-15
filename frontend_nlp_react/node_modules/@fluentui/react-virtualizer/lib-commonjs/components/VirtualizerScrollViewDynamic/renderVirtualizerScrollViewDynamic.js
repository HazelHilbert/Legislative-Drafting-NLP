"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderVirtualizerScrollViewDynamic_unstable", {
    enumerable: true,
    get: function() {
        return renderVirtualizerScrollViewDynamic_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _renderVirtualizer = require("../Virtualizer/renderVirtualizer");
const renderVirtualizerScrollViewDynamic_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.container, {
        children: (0, _renderVirtualizer.renderVirtualizer_unstable)(state)
    });
};
