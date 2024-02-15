import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import * as React from 'react';
/**
 * Given user props, returns state and render function for a MenuDivider.
 */ export const useMenuDivider_unstable = (props, ref)=>{
    return {
        components: {
            root: 'div'
        },
        root: slot.always(getIntrinsicElementProps('div', {
            role: 'presentation',
            'aria-hidden': true,
            ...props,
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref
        }), {
            elementType: 'div'
        })
    };
};
