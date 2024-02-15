  import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of AriaLive
 */ export const renderAriaLive_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(state.assertive, {}),
            /*#__PURE__*/ _jsx(state.polite, {})
        ]
    });
};
