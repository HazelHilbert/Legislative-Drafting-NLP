import { EVENTS } from '../constants';
export function pauseToast(toastId, toasterId = undefined, targetDocument) {
    const event = new CustomEvent(EVENTS.pause, {
        bubbles: false,
        cancelable: false,
        detail: {
            toastId,
            toasterId
        }
    });
    targetDocument.dispatchEvent(event);
}
