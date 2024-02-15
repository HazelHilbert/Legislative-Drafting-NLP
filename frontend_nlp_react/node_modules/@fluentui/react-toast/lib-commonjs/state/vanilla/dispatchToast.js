"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dispatchToast", {
    enumerable: true,
    get: function() {
        return dispatchToast;
    }
});
const _constants = require("../constants");
let counter = 0;
function dispatchToast(content, options = {}, targetDocument) {
    var _options_toastId;
    const detail = {
        ...options,
        content,
        toastId: (_options_toastId = options.toastId) !== null && _options_toastId !== void 0 ? _options_toastId : (counter++).toString()
    };
    const event = new CustomEvent(_constants.EVENTS.show, {
        bubbles: false,
        cancelable: false,
        detail
    });
    targetDocument.dispatchEvent(event);
}
