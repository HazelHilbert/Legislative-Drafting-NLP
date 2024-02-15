  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of InfoLabel
 */ export const renderInfoLabel_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            /*#__PURE__*/ _jsx(state.label, {}),
            state.infoButton && /*#__PURE__*/ _jsx(state.infoButton, {})
        ]
    });
};
