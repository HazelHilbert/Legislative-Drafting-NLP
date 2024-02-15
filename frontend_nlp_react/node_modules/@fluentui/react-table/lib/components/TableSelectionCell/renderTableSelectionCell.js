  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of TableSelectionCell
 */ export const renderTableSelectionCell_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.type === 'checkbox' && state.checkboxIndicator && /*#__PURE__*/ _jsx(state.checkboxIndicator, {}),
            state.type === 'radio' && state.radioIndicator && /*#__PURE__*/ _jsx(state.radioIndicator, {})
        ]
    });
};
