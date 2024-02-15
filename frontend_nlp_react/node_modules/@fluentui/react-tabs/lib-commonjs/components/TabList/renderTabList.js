"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTabList_unstable", {
    enumerable: true,
    get: function() {
        return renderTabList_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _TabListContext = require("./TabListContext");
const renderTabList_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_TabListContext.TabListProvider, {
            value: contextValues.tabList,
            children: state.root.children
        })
    });
};
