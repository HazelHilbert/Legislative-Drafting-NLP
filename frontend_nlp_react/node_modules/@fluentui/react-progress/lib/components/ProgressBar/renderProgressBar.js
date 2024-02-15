  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of ProgressBar
 */ export const renderProgressBar_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: state.bar && /*#__PURE__*/ _jsx(state.bar, {})
    });
};
