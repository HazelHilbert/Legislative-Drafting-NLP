"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSlot", {
    enumerable: true,
    get: function() {
        return isSlot;
    }
});
const _constants = require("./constants");
function isSlot(element) {
    return Boolean(element === null || element === void 0 ? void 0 : element.hasOwnProperty(_constants.SLOT_ELEMENT_TYPE_SYMBOL));
}
