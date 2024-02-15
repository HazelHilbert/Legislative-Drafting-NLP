  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { MenuGroupContextProvider } from '../../contexts/menuGroupContext';
/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */ export const renderMenuGroup_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(MenuGroupContextProvider, {
        value: contextValues.menuGroup,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
