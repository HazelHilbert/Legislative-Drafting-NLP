  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { TabListProvider } from './TabListContext';
/**
 * Render the final JSX of TabList
 */ export const renderTabList_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: /*#__PURE__*/ _jsx(TabListProvider, {
            value: contextValues.tabList,
            children: state.root.children
        })
    });
};
