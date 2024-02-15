"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderMenuGroup_unstable", {
    enumerable: true,
    get: function() {
        return renderMenuGroup_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _menuGroupContext = require("../../contexts/menuGroupContext");
const renderMenuGroup_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_menuGroupContext.MenuGroupContextProvider, {
        value: contextValues.menuGroup,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
