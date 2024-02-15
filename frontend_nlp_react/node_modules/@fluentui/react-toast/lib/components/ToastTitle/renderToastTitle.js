  import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of ToastTitle
 */ export const renderToastTitle_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            state.media ? /*#__PURE__*/ _jsx(state.media, {}) : null,
            /*#__PURE__*/ _jsx(state.root, {}),
            state.action ? /*#__PURE__*/ _jsx(state.action, {}) : null
        ]
    });
};
