  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Redefine the render function to add slots. Reuse the menudivider structure but add
 * slots to children.
 */ export const renderMenuDivider_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {});
};
