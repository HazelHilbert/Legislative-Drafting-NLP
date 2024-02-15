  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of MenuItemLink
 */ export const renderMenuItemLink_unstable = (state)=>{
    assertSlots(state);
    // TODO Add additional slots in the appropriate place
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.checkmark && /*#__PURE__*/ _jsx(state.checkmark, {}),
            state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            state.content && /*#__PURE__*/ _jsx(state.content, {}),
            state.secondaryContent && /*#__PURE__*/ _jsx(state.secondaryContent, {})
        ]
    });
};
