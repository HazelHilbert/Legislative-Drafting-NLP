  import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of DialogTitle
 */ export const renderDialogTitle_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(state.root, {
                children: state.root.children
            }),
            state.action && /*#__PURE__*/ _jsx(state.action, {})
        ]
    });
};
