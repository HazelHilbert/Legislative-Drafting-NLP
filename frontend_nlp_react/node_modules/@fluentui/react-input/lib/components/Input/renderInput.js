  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of Input
 */ export const renderInput_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.contentBefore && /*#__PURE__*/ _jsx(state.contentBefore, {}),
            /*#__PURE__*/ _jsx(state.input, {}),
            state.contentAfter && /*#__PURE__*/ _jsx(state.contentAfter, {})
        ]
    });
};
