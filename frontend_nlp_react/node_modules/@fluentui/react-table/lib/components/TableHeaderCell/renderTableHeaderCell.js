  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of TableHeaderCell
 */ export const renderTableHeaderCell_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            /*#__PURE__*/ _jsxs(state.button, {
                children: [
                    state.root.children,
                    state.sortIcon && /*#__PURE__*/ _jsx(state.sortIcon, {})
                ]
            }),
            state.aside && /*#__PURE__*/ _jsx(state.aside, {})
        ]
    });
};
