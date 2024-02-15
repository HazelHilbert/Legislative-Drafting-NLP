import * as React from 'react';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
import { Runtime } from '../utils/Runtime';
export const jsxsSlot = (type, overrideProps, key)=>{
    const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);
    const props = {
        ...slotProps,
        ...overrideProps
    };
    if (renderFunction) {
        /**
     * In static runtime then children is an array and this array won't be keyed.
     * We should wrap children by a static fragment
     * as there's no way to know if renderFunction will render statically or dynamically
     */ return Runtime.jsx(React.Fragment, {
            children: renderFunction(elementType, {
                ...props,
                children: Runtime.jsxs(React.Fragment, {
                    children: props.children
                }, undefined)
            })
        }, key);
    }
    return Runtime.jsxs(elementType, props, key);
};
