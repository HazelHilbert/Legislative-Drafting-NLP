  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { PopoverTrigger } from '@fluentui/react-popover';
/**
 * Render the final JSX of InfoButton
 */ export const renderInfoButton_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.popover, {
        children: [
            /*#__PURE__*/ _jsx(PopoverTrigger, {
                children: /*#__PURE__*/ _jsx(state.root, {})
            }),
            /*#__PURE__*/ _jsx(state.info, {})
        ]
    });
};
