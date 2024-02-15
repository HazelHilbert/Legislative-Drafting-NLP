"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "playToast", {
    enumerable: true,
    get: function() {
        return playToast;
    }
});
const _constants = require("../constants");
function playToast(toastId, toasterId = undefined, targetDocument) {
    const event = new CustomEvent(_constants.EVENTS.play, {
        bubbles: false,
        cancelable: false,
        detail: {
            toastId,
            toasterId
        }
    });
    targetDocument.dispatchEvent(event);
}
