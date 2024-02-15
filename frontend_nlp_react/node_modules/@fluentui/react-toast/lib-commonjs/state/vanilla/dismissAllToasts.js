"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dismissAllToasts", {
    enumerable: true,
    get: function() {
        return dismissAllToasts;
    }
});
const _constants = require("../constants");
function dismissAllToasts(toasterId = undefined, targetDocument) {
    const event = new CustomEvent(_constants.EVENTS.dismissAll, {
        bubbles: false,
        cancelable: false,
        detail: {
            toasterId
        }
    });
    targetDocument.dispatchEvent(event);
}
