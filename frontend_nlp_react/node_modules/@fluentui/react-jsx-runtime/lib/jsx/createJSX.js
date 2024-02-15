import { isSlot } from '@fluentui/react-utilities';
import * as React from 'react';
import { createCompatSlotComponent } from '../utils/createCompatSlotComponent';
import { warnIfElementTypeIsInvalid } from '../utils/warnIfElementTypeIsInvalid';
export function createJSX(runtime, slotRuntime) {
    return function jsx(type, overrideProps, key, source, self) {
        // TODO:
        // this is for backwards compatibility with getSlotsNext
        // it should be removed once getSlotsNext is obsolete
        if (isSlot(overrideProps)) {
            return slotRuntime(createCompatSlotComponent(type, overrideProps), null, key, source, self);
        }
        if (isSlot(type)) {
            return slotRuntime(type, overrideProps, key, source, self);
        }
        warnIfElementTypeIsInvalid(type);
        return runtime(type, overrideProps, key, source, self);
    };
}
