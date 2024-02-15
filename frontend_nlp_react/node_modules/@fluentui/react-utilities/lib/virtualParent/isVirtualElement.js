/**
 * Determines whether or not an element has the virtual hierarchy extension.
 * @internal
 */ export function isVirtualElement(element) {
    return element && !!element._virtual;
}
