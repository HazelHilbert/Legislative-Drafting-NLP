  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of Option
 */ export const renderOption_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.checkIcon && /*#__PURE__*/ _jsx(state.checkIcon, {}),
            state.root.children
        ]
    });
};
