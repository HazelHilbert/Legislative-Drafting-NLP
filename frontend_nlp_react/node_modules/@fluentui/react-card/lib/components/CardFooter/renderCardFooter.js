  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of CardFooter.
 */ export const renderCardFooter_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.root.children,
            state.action && /*#__PURE__*/ _jsx(state.action, {})
        ]
    });
};
