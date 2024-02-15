import { SLOT_ELEMENT_TYPE_SYMBOL } from './constants';
/**
 * Guard method to ensure a given element is a slot.
 * This is mainly used internally to ensure a slot is being used as a component.
 */ export function isSlot(element) {
    return Boolean(element === null || element === void 0 ? void 0 : element.hasOwnProperty(SLOT_ELEMENT_TYPE_SYMBOL));
}
