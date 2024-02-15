import { EVENTS } from '../constants';
export function updateToast(options, targetDocument) {
    const event = new CustomEvent(EVENTS.update, {
        bubbles: false,
        cancelable: false,
        detail: options
    });
    targetDocument.dispatchEvent(event);
}
