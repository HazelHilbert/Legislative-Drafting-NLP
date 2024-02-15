  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of OptionGroup
 */ export const renderOptionGroup_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.label && /*#__PURE__*/ _jsx(state.label, {
                children: state.label.children
            }),
            state.root.children
        ]
    });
};
