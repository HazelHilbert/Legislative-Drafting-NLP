  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Renders a SplitButton component by passing the state defined props to the appropriate slots.
 */ export const renderSplitButton_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.primaryActionButton && /*#__PURE__*/ _jsx(state.primaryActionButton, {}),
            state.menuButton && /*#__PURE__*/ _jsx(state.menuButton, {})
        ]
    });
};
