"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateToast", {
    enumerable: true,
    get: function() {
        return updateToast;
    }
});
const _constants = require("../constants");
function updateToast(options, targetDocument) {
    const event = new CustomEvent(_constants.EVENTS.update, {
        bubbles: false,
        cancelable: false,
        detail: options
    });
    targetDocument.dispatchEvent(event);
}
