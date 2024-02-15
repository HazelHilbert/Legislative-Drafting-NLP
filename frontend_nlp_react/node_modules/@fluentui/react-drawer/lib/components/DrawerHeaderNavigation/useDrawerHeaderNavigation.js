import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
/**
 * Create the state required to render DrawerHeaderNavigation.
 *
 * The returned state can be modified with hooks such as useDrawerHeaderNavigationStyles_unstable,
 * before being passed to renderDrawerHeaderNavigation_unstable.
 *
 * @param props - props from this instance of DrawerHeaderNavigation
 * @param ref - reference to root HTMLElement of DrawerHeaderNavigation
 */ export const useDrawerHeaderNavigation_unstable = (props, ref)=>{
    return {
        components: {
            root: 'nav'
        },
        root: slot.always(getIntrinsicElementProps('nav', {
            ref,
            ...props
        }), {
            elementType: 'nav'
        })
    };
};
