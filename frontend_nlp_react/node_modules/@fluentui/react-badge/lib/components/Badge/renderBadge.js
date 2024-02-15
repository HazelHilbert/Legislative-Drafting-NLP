  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
export const renderBadge_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.iconPosition === 'before' && state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            state.root.children,
            state.iconPosition === 'after' && state.icon && /*#__PURE__*/ _jsx(state.icon, {})
        ]
    });
};
