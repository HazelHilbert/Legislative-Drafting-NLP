"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePersona_unstable", {
    enumerable: true,
    get: function() {
        return usePersona_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactavatar = require("@fluentui/react-avatar");
const _reactutilities = require("@fluentui/react-utilities");
const _reactbadge = require("@fluentui/react-badge");
const usePersona_unstable = (props, ref)=>{
    const { name, presenceOnly = false, size = 'medium', textAlignment = 'start', textPosition = 'after' } = props;
    const primaryText = _reactutilities.slot.optional(props.primaryText, {
        renderByDefault: true,
        defaultProps: {
            children: name
        },
        elementType: 'span'
    });
    const secondaryText = _reactutilities.slot.optional(props.secondaryText, {
        elementType: 'span'
    });
    const tertiaryText = _reactutilities.slot.optional(props.tertiaryText, {
        elementType: 'span'
    });
    const quaternaryText = _reactutilities.slot.optional(props.quaternaryText, {
        elementType: 'span'
    });
    const numTextLines = [
        primaryText,
        secondaryText,
        tertiaryText,
        quaternaryText
    ].filter(Boolean).length;
    return {
        numTextLines,
        presenceOnly,
        size,
        textAlignment,
        textPosition,
        components: {
            root: 'div',
            avatar: _reactavatar.Avatar,
            presence: _reactbadge.PresenceBadge,
            primaryText: 'span',
            secondaryText: 'span',
            tertiaryText: 'span',
            quaternaryText: 'span'
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            ...props,
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref
        }, /* excludedPropNames */ [
            'name'
        ]), {
            elementType: 'div'
        }),
        avatar: !presenceOnly ? _reactutilities.slot.optional(props.avatar, {
            renderByDefault: true,
            defaultProps: {
                name,
                badge: props.presence,
                size: avatarSizes[size]
            },
            elementType: _reactavatar.Avatar
        }) : undefined,
        presence: presenceOnly ? _reactutilities.slot.optional(props.presence, {
            defaultProps: {
                size: presenceSizes[size]
            },
            elementType: _reactbadge.PresenceBadge
        }) : undefined,
        primaryText,
        secondaryText,
        tertiaryText,
        quaternaryText
    };
};
const presenceSizes = {
    'extra-small': 'tiny',
    small: 'extra-small',
    medium: 'small',
    large: 'medium',
    'extra-large': 'large',
    huge: 'large'
};
const avatarSizes = {
    'extra-small': 20,
    small: 28,
    medium: 32,
    large: 36,
    'extra-large': 40,
    huge: 56
};
