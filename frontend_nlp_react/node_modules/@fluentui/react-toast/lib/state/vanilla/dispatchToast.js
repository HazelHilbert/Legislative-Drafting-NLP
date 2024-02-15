import { EVENTS } from '../constants';
let counter = 0;
export function dispatchToast(content, options = {}, targetDocument) {
    var _options_toastId;
    const detail = {
        ...options,
        content,
        toastId: (_options_toastId = options.toastId) !== null && _options_toastId !== void 0 ? _options_toastId : (counter++).toString()
    };
    const event = new CustomEvent(EVENTS.show, {
        bubbles: false,
        cancelable: false,
        detail
    });
    targetDocument.dispatchEvent(event);
}
