import * as React from 'react';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
import { Runtime } from '../utils/Runtime';
export const jsxSlot = (type, overrideProps, key)=>{
    const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);
    const props = {
        ...slotProps,
        ...overrideProps
    };
    if (renderFunction) {
        return Runtime.jsx(React.Fragment, {
            children: renderFunction(elementType, props)
        }, key);
    }
    return Runtime.jsx(elementType, props, key);
};
