"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dismissToast", {
    enumerable: true,
    get: function() {
        return dismissToast;
    }
});
const _constants = require("../constants");
function dismissToast(toastId, toasterId = undefined, targetDocument) {
    const event = new CustomEvent(_constants.EVENTS.dismiss, {
        bubbles: false,
        cancelable: false,
        detail: {
            toastId,
            toasterId
        }
    });
    targetDocument.dispatchEvent(event);
}
