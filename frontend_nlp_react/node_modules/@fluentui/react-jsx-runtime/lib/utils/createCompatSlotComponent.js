import * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
// TODO:
// this is for backwards compatibility with getSlotsNext
// it should be removed once getSlotsNext is obsolete
export function createCompatSlotComponent(type, props) {
    return {
        ...props,
        [SLOT_ELEMENT_TYPE_SYMBOL]: type
    };
}
