  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of Tab
 */ export const renderTab_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            !state.iconOnly && /*#__PURE__*/ _jsx(state.content, {}),
            state.contentReservedSpace && /*#__PURE__*/ _jsx(state.contentReservedSpace, {})
        ]
    });
};
