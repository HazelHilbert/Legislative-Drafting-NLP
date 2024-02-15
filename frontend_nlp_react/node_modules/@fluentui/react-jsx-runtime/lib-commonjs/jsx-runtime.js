"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Fragment: function() {
        return _react.Fragment;
    },
    jsx: function() {
        return jsx;
    },
    jsxs: function() {
        return jsxs;
    }
});
const _createJSX = require("./jsx/createJSX");
const _jsxSlot = require("./jsx/jsxSlot");
const _jsxsSlot = require("./jsx/jsxsSlot");
const _Runtime = require("./utils/Runtime");
const _react = require("react");
const jsx = (0, _createJSX.createJSX)(_Runtime.Runtime.jsx, _jsxSlot.jsxSlot);
const jsxs = (0, _createJSX.createJSX)(_Runtime.Runtime.jsxs, _jsxsSlot.jsxsSlot);
