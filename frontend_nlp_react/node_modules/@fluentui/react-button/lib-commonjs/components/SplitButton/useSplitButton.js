"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useSplitButton_unstable", {
    enumerable: true,
    get: function() {
        return useSplitButton_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactutilities = require("@fluentui/react-utilities");
const _Button = require("../Button/Button");
const _MenuButton = require("../MenuButton/MenuButton");
const useSplitButton_unstable = (props, ref)=>{
    const { appearance = 'secondary', children, disabled = false, disabledFocusable = false, icon, iconPosition = 'before', menuButton, menuIcon, primaryActionButton, shape = 'rounded', size = 'medium' } = props;
    const baseId = (0, _reactutilities.useId)('splitButton-');
    const menuButtonShorthand = _reactutilities.slot.optional(menuButton, {
        defaultProps: {
            appearance,
            disabled,
            disabledFocusable,
            menuIcon,
            shape,
            size
        },
        renderByDefault: true,
        elementType: _MenuButton.MenuButton
    });
    const primaryActionButtonShorthand = _reactutilities.slot.optional(primaryActionButton, {
        defaultProps: {
            appearance,
            children,
            disabled,
            disabledFocusable,
            icon,
            iconPosition,
            id: baseId + '__primaryActionButton',
            shape,
            size
        },
        renderByDefault: true,
        elementType: _Button.Button
    });
    // Resolve menu button's aria-labelledby to be labelled by the primary action button if no label was provided by the
    // user.
    if (menuButtonShorthand && primaryActionButtonShorthand && !menuButtonShorthand['aria-label'] && !menuButtonShorthand['aria-labelledby']) {
        menuButtonShorthand['aria-labelledby'] = primaryActionButtonShorthand.id;
    }
    return {
        // Props passed at the top-level
        appearance,
        disabled,
        disabledFocusable,
        iconPosition,
        shape,
        size,
        components: {
            root: 'div',
            menuButton: _MenuButton.MenuButton,
            primaryActionButton: _Button.Button
        },
        root: _reactutilities.slot.always((0, _reactutilities.getIntrinsicElementProps)('div', {
            ref,
            ...props
        }), {
            elementType: 'div'
        }),
        menuButton: menuButtonShorthand,
        primaryActionButton: primaryActionButtonShorthand
    };
};
