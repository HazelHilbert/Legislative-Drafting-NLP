"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pauseToast", {
    enumerable: true,
    get: function() {
        return pauseToast;
    }
});
const _constants = require("../constants");
function pauseToast(toastId, toasterId = undefined, targetDocument) {
    const event = new CustomEvent(_constants.EVENTS.pause, {
        bubbles: false,
        cancelable: false,
        detail: {
            toastId,
            toasterId
        }
    });
    targetDocument.dispatchEvent(event);
}
