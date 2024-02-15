  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { AvatarContextProvider } from '@fluentui/react-avatar';
/**
 * Render the final JSX of Tag
 */ export const renderTag_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.media && /*#__PURE__*/ _jsx(AvatarContextProvider, {
                value: contextValues.avatar,
                children: /*#__PURE__*/ _jsx(state.media, {})
            }),
            state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
            state.primaryText && /*#__PURE__*/ _jsx(state.primaryText, {}),
            state.secondaryText && /*#__PURE__*/ _jsx(state.secondaryText, {}),
            state.dismissIcon && state.dismissible && /*#__PURE__*/ _jsx(state.dismissIcon, {})
        ]
    });
};
