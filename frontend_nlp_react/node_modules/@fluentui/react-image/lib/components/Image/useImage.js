import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
/**
 * Given user props, returns state and render function for an Image.
 */ export const useImage_unstable = (props, ref)=>{
    const { bordered = false, fit = 'default', block = false, shape = 'square', shadow = false } = props;
    const state = {
        bordered,
        fit,
        block,
        shape,
        shadow,
        components: {
            root: 'img'
        },
        root: slot.always(getIntrinsicElementProps('img', {
            ref,
            ...props
        }), {
            elementType: 'img'
        })
    };
    return state;
};
