  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Renders a Button component by passing the state defined props to the appropriate slots.
 */ export const renderButton_unstable = (state)=>{
    assertSlots(state);
    const { iconOnly, iconPosition } = state;
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            iconPosition !== 'after' && state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            !iconOnly && state.root.children,
            iconPosition === 'after' && state.icon && /*#__PURE__*/ _jsx(state.icon, {})
        ]
    });
};
