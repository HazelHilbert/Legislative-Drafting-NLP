  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { MessageBarContextProvider } from '../../contexts/messageBarContext';
/**
 * Render the final JSX of MessageBar
 */ export const renderMessageBar_unstable = (state, contexts)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(MessageBarContextProvider, {
        value: contexts.messageBar,
        children: /*#__PURE__*/ _jsxs(state.root, {
            children: [
                state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
                state.root.children,
                state.bottomReflowSpacer && /*#__PURE__*/ _jsx(state.bottomReflowSpacer, {})
            ]
        })
    });
};
