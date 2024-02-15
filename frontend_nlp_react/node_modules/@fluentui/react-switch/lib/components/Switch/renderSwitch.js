  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render a Switch component by passing the state defined props to the appropriate slots.
 */ export const renderSwitch_unstable = (state)=>{
    assertSlots(state);
    const { labelPosition } = state;
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            /*#__PURE__*/ _jsx(state.input, {}),
            labelPosition !== 'after' && state.label && /*#__PURE__*/ _jsx(state.label, {}),
            /*#__PURE__*/ _jsx(state.indicator, {}),
            labelPosition === 'after' && state.label && /*#__PURE__*/ _jsx(state.label, {})
        ]
    });
};
