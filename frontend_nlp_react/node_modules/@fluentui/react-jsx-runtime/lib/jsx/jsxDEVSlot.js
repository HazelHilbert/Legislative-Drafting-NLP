import * as React from 'react';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
import { DevRuntime } from '../utils/DevRuntime';
export const jsxDEVSlot = (type, overrideProps, key, source, self)=>{
    const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);
    const props = {
        ...slotProps,
        ...overrideProps
    };
    if (renderFunction) {
        // if runtime is static
        if (source === true) {
            return DevRuntime.jsxDEV(React.Fragment, {
                children: renderFunction(elementType, {
                    ...props,
                    /**
             * If the runtime is static then children is an array and this array won't be keyed.
             * Then we should wrap children by a static fragment
             * as there's no way to know if renderFunction will render statically or dynamically
             */ children: DevRuntime.jsxDEV(React.Fragment, {
                        children: props.children
                    }, undefined, true, self)
                })
            }, key, false, self);
        }
        // if runtime is dynamic (source = false) things are simpler
        return DevRuntime.jsxDEV(React.Fragment, {
            children: renderFunction(elementType, props)
        }, key, source, self);
    }
    return DevRuntime.jsxDEV(elementType, props, key, source, self);
};
