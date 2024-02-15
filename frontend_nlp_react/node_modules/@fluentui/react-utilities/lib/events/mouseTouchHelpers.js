import * as React from 'react';
/**
 * Returns true if event is a touch event. Useful when sharing logic between touch and mouse interactions.
 */ export function isTouchEvent(event) {
    return event.type.startsWith('touch');
}
/**
 * Returns true if event is a mouse event. Useful when sharing logic between touch and mouse interactions.
 */ export function isMouseEvent(event) {
    return event.type.startsWith('mouse') || [
        'click',
        'contextmenu',
        'dblclick'
    ].indexOf(event.type) > -1;
}
/**
 * Returns an object with clientX, clientY for TouchOrMouseEvent.
 * Returns zeros in case the event is not a mouse or a touch event.
 */ export function getEventClientCoords(event) {
    if (isMouseEvent(event)) {
        return {
            clientX: event.clientX,
            clientY: event.clientY
        };
    } else if (isTouchEvent(event)) {
        return {
            clientX: event.touches[0].clientX,
            clientY: event.touches[0].clientY
        };
    } else {
        if (process.env.NODE_ENV !== 'production') {
            throw new Error('@fluentui/react-utilities]: Unable to get clientX. Unknown event type.');
        }
        return {
            clientX: 0,
            clientY: 0
        };
    }
}
