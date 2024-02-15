  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { ButtonContextProvider } from '@fluentui/react-button';
/**
 * Render the final JSX of TreeItemLayout
 */ export const renderTreeItemLayout_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.expandIcon && /*#__PURE__*/ _jsx(state.expandIcon, {}),
            state.selector && /*#__PURE__*/ _jsx(state.selector, {}),
            state.iconBefore && /*#__PURE__*/ _jsx(state.iconBefore, {}),
            /*#__PURE__*/ _jsx(state.main, {
                children: state.root.children
            }),
            state.iconAfter && /*#__PURE__*/ _jsx(state.iconAfter, {}),
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
