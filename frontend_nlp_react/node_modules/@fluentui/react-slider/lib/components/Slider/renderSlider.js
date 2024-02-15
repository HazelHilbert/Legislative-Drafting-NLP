  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of Slider
 */ export const renderSlider_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            /*#__PURE__*/ _jsx(state.input, {}),
            /*#__PURE__*/ _jsx(state.rail, {}),
            /*#__PURE__*/ _jsx(state.thumb, {})
        ]
    });
};
