  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { MenuListProvider } from '../../contexts/menuListContext';
/**
 * Function that renders the final JSX of the component
 */ export const renderMenuList_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(MenuListProvider, {
        value: contextValues.menuList,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
