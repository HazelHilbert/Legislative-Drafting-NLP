  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { AvatarContextProvider } from '@fluentui/react-avatar';
import { ButtonContextProvider } from '@fluentui/react-button';
/**
 * Render the final JSX of TreeItemPersonaLayout
 */ export const renderTreeItemPersonaLayout_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.expandIcon && /*#__PURE__*/ _jsx(state.expandIcon, {}),
            state.selector && /*#__PURE__*/ _jsx(state.selector, {}),
            /*#__PURE__*/ _jsx(AvatarContextProvider, {
                value: contextValues.avatar,
                children: /*#__PURE__*/ _jsx(state.media, {})
            }),
            /*#__PURE__*/ _jsx(state.main, {}),
            state.description && /*#__PURE__*/ _jsx(state.description, {}),
            /*#__PURE__*/ _jsxs(ButtonContextProvider, {
                value: state.buttonContextValue,
                children: [
                    state.actions && /*#__PURE__*/ _jsx(state.actions, {}),
                    state.aside && /*#__PURE__*/ _jsx(state.aside, {})
                ]
            })
        ]
    });
};
