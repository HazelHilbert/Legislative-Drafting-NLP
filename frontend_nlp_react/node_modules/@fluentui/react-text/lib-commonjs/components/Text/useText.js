"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useText_unstable", {
    enumerable: true,
    get: function() {
        return useText_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const useText_unstable = (props, ref)=>{
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
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('span', {
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
