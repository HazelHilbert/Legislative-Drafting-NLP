  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
export const renderAvatar_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.initials && /*#__PURE__*/ _jsx(state.initials, {}),
            state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            state.image && /*#__PURE__*/ _jsx(state.image, {}),
            state.badge && /*#__PURE__*/ _jsx(state.badge, {}),
            state.activeAriaLabelElement
        ]
    });
};
