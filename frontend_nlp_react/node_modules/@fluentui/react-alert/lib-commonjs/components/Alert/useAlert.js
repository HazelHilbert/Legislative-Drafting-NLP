"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAlert_unstable", {
    enumerable: true,
    get: function() {
        return useAlert_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactavatar = require("@fluentui/react-avatar");
const _reactbutton = require("@fluentui/react-button");
const _reacticons = require("@fluentui/react-icons");
const _reactutilities = require("@fluentui/react-utilities");
const useAlert_unstable = (props, ref)=>{
    const { appearance = 'primary', intent } = props;
    /** Determine the role and icon to render based on the intent */ let defaultIcon;
    let defaultRole = 'status';
    switch(intent){
        case 'success':
            defaultIcon = /*#__PURE__*/ _react.createElement(_reacticons.CheckmarkCircleFilled, null);
            break;
        case 'error':
            defaultIcon = /*#__PURE__*/ _react.createElement(_reacticons.DismissCircleFilled, null);
            defaultRole = 'alert';
            break;
        case 'warning':
            defaultIcon = /*#__PURE__*/ _react.createElement(_reacticons.WarningFilled, null);
            defaultRole = 'alert';
            break;
        case 'info':
            defaultIcon = /*#__PURE__*/ _react.createElement(_reacticons.InfoFilled, null);
            break;
    }
    const action = _reactutilities.slot.optional(props.action, {
        defaultProps: {
            appearance: 'transparent'
        },
        elementType: _reactbutton.Button
    });
    const avatar = _reactutilities.slot.optional(props.avatar, {
        elementType: _reactavatar.Avatar
    });
    let icon;
    /** Avatar prop takes precedence over the icon or intent prop */ if (!avatar) {
        icon = _reactutilities.slot.optional(props.icon, {
            defaultProps: {
                children: defaultIcon
            },
            renderByDefault: !!props.intent,
            elementType: 'span'
        });
    }
    return {
        action,
        appearance,
        avatar,
        components: {
            root: 'div',
            icon: 'span',
            action: _reactbutton.Button,
            avatar: _reactavatar.Avatar
        },
        icon,
        intent,
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            // FIXME:
            // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
            // but since it would be a breaking change to fix it, we are casting ref to it's proper type
            ref: ref,
            role: defaultRole,
            children: props.children,
            ...props
        }), {
            elementType: 'div'
        })
    };
};
