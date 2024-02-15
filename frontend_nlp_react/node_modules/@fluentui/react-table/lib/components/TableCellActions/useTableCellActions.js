import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
/**
 * Create the state required to render TableCellActions.
 *
 * The returned state can be modified with hooks such as useTableCellActionsStyles_unstable,
 * before being passed to renderTableCellActions_unstable.
 *
 * @param props - props from this instance of TableCellActions
 * @param ref - reference to root HTMLElement of TableCellActions
 */ export const useTableCellActions_unstable = (props, ref)=>{
    var _props_visible;
    return {
        components: {
            root: 'div'
        },
        root: slot.always(getIntrinsicElementProps('div', {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            ...props
        }), {
            elementType: 'div'
        }),
        visible: (_props_visible = props.visible) !== null && _props_visible !== void 0 ? _props_visible : false
    };
};
