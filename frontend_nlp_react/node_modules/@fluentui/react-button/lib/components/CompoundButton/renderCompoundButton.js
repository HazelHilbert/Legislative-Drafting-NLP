  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Renders a CompoundButton component by passing the state defined props to the appropriate slots.
 */ export const renderCompoundButton_unstable = (state)=>{
    assertSlots(state);
    const { iconOnly, iconPosition } = state;
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            iconPosition !== 'after' && state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            !iconOnly && /*#__PURE__*/ _jsxs(state.contentContainer, {
                children: [
                    state.root.children,
                    state.secondaryContent && /*#__PURE__*/ _jsx(state.secondaryContent, {})
                ]
            }),
            iconPosition === 'after' && state.icon && /*#__PURE__*/ _jsx(state.icon, {})
        ]
    });
};
