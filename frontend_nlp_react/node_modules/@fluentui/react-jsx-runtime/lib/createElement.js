import * as React from 'react';
import { isSlot } from '@fluentui/react-utilities';
import { createElementFromSlotComponent } from './jsx/createElementFromSlotComponent';
import { createCompatSlotComponent } from './utils/createCompatSlotComponent';
export function createElement(type, props, ...children) {
    // TODO:
    // this is for backwards compatibility with getSlotsNext
    // it should be removed once getSlotsNext is obsolete
    if (isSlot(props)) {
        return createElementFromSlotComponent(createCompatSlotComponent(type, props), children);
    }
    if (isSlot(type)) {
        return createElementFromSlotComponent(type, children);
    }
    return React.createElement(type, props, ...children);
}
