  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of SpinButton
 */ export const renderSpinButton_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            /*#__PURE__*/ _jsx(state.input, {}),
            /*#__PURE__*/ _jsx(state.incrementButton, {}),
            /*#__PURE__*/ _jsx(state.decrementButton, {})
        ]
    });
};
