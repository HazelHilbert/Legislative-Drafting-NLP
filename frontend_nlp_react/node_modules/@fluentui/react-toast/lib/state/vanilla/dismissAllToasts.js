import { EVENTS } from '../constants';
export function dismissAllToasts(toasterId = undefined, targetDocument) {
    const event = new CustomEvent(EVENTS.dismissAll, {
        bubbles: false,
        cancelable: false,
        detail: {
            toasterId
        }
    });
    targetDocument.dispatchEvent(event);
}
