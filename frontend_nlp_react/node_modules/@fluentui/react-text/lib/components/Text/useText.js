import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
/**
 * Create the state required to render Text.
 *
 * The returned state can be modified with hooks such as useTextStyles_unstable,
 * before being passed to renderText_unstable.
 *
 * @param props - props from this instance of Text
 * @param ref - reference to root HTMLElement of Text
 */ export const useText_unstable = (props, ref)=>{
    const { wrap, truncate, block, italic, underline, strikethrough, size, font, weight, align } = props;
    const state = {
        align: align !== null && align !== void 0 ? align : 'start',
        block: block !== null && block !== void 0 ? block : false,
        font: font !== null && font !== void 0 ? font : 'base',
        italic: italic !== null && italic !== void 0 ? italic : false,
        size: size !== null && size !== void 0 ? size : 300,
        strikethrough: strikethrough !== null && strikethrough !== void 0 ? strikethrough : false,
        truncate: truncate !== null && truncate !== void 0 ? truncate : false,
        underline: underline !== null && underline !== void 0 ? underline : false,
        weight: weight !== null && weight !== void 0 ? weight : 'regular',
        wrap: wrap !== null && wrap !== void 0 ? wrap : true,
        components: {
            root: 'span'
        },
        root: slot.always(getIntrinsicElementProps('span', {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLHeadingElement & HTMLPreElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            ...props
        }), {
            elementType: 'span'
        })
    };
    return state;
};
