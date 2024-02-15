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
    jsxDEV: function() {
        return jsxDEV;
    }
});
const _createJSX = require("./jsx/createJSX");
const _jsxDEVSlot = require("./jsx/jsxDEVSlot");
const _DevRuntime = require("./utils/DevRuntime");
const _react = require("react");
const jsxDEV = (0, _createJSX.createJSX)(_DevRuntime.DevRuntime.jsxDEV, _jsxDEVSlot.jsxDEVSlot);
