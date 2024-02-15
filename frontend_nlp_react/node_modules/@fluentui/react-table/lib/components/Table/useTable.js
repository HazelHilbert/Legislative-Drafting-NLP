import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
/**
 * Create the state required to render Table.
 *
 * The returned state can be modified with hooks such as useTableStyles_unstable,
 * before being passed to renderTable_unstable.
 *
 * @param props - props from this instance of Table
 * @param ref - reference to root HTMLElement of Table
 */ export const useTable_unstable = (props, ref)=>{
    var _props_as;
    const rootComponent = ((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : props.noNativeElements) ? 'div' : 'table';
    var _props_size, _props_noNativeElements, _props_sortable;
    return {
        components: {
            root: rootComponent
        },
        root: slot.always(getIntrinsicElementProps(rootComponent, {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            role: rootComponent === 'div' ? 'table' : undefined,
            ...props
        }), {
            elementType: rootComponent
        }),
        size: (_props_size = props.size) !== null && _props_size !== void 0 ? _props_size : 'medium',
        noNativeElements: (_props_noNativeElements = props.noNativeElements) !== null && _props_noNativeElements !== void 0 ? _props_noNativeElements : false,
        sortable: (_props_sortable = props.sortable) !== null && _props_sortable !== void 0 ? _props_sortable : false
    };
};
