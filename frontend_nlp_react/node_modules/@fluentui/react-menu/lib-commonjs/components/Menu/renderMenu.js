"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderMenu_unstable", {
    enumerable: true,
    get: function() {
        return renderMenu_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _menuContext = require("../../contexts/menuContext");
const renderMenu_unstable = (state, contextValues)=>{
    return /*#__PURE__*/ _react.createElement(_menuContext.MenuProvider, {
        value: contextValues.menu
    }, state.menuTrigger, state.open && state.menuPopover);
};
