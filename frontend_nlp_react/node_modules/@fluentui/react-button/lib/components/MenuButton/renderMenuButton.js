  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Renders a MenuButton component by passing the state defined props to the appropriate slots.
 */ export const renderMenuButton_unstable = (state)=>{
    assertSlots(state);
    const { icon, iconOnly } = state;
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            !iconOnly && state.root.children,
            (!iconOnly || !(icon === null || icon === void 0 ? void 0 : icon.children)) && state.menuIcon && /*#__PURE__*/ _jsx(state.menuIcon, {})
        ]
    });
};
