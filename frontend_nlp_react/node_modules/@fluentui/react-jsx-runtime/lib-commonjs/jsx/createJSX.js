"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createJSX", {
    enumerable: true,
    get: function() {
        return createJSX;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _reactutilities = require("@fluentui/react-utilities");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _createCompatSlotComponent = require("../utils/createCompatSlotComponent");
const _warnIfElementTypeIsInvalid = require("../utils/warnIfElementTypeIsInvalid");
function createJSX(runtime, slotRuntime) {
    return function jsx(type, overrideProps, key, source, self) {
        // TODO:
        // this is for backwards compatibility with getSlotsNext
        // it should be removed once getSlotsNext is obsolete
        if ((0, _reactutilities.isSlot)(overrideProps)) {
            return slotRuntime((0, _createCompatSlotComponent.createCompatSlotComponent)(type, overrideProps), null, key, source, self);
        }
        if ((0, _reactutilities.isSlot)(type)) {
            return slotRuntime(type, overrideProps, key, source, self);
        }
        (0, _warnIfElementTypeIsInvalid.warnIfElementTypeIsInvalid)(type);
        return runtime(type, overrideProps, key, source, self);
    };
}
