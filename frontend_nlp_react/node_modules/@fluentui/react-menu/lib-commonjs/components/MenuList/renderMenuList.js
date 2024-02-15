"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderMenuList_unstable", {
    enumerable: true,
    get: function() {
        return renderMenuList_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _menuListContext = require("../../contexts/menuListContext");
const renderMenuList_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_menuListContext.MenuListProvider, {
        value: contextValues.menuList,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
