  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Renders a Divider component by passing the slot props (defined in `state`) to the appropriate slots.
 */ export const renderDivider_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: state.root.children !== undefined && /*#__PURE__*/ _jsx(state.wrapper, {
            children: state.root.children
        })
    });
};
