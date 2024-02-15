import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
/**
 * Create the state required to render AvatarGroup.
 *
 * The returned state can be modified with hooks such as useAvatarGroupStyles_unstable,
 * before being passed to renderAvatarGroup_unstable.
 *
 * @param props - props from this instance of AvatarGroup
 * @param ref - reference to root HTMLElement of AvatarGroup
 */ export const useAvatarGroup_unstable = (props, ref)=>{
    const { layout = 'spread', size = defaultAvatarGroupSize } = props;
    const root = slot.always(getIntrinsicElementProps('div', {
        role: 'group',
        ...props,
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref
    }, [
        'size'
    ]), {
        elementType: 'div'
    });
    return {
        layout,
        size,
        components: {
            root: 'div'
        },
        root
    };
};
export const defaultAvatarGroupSize = 32;
