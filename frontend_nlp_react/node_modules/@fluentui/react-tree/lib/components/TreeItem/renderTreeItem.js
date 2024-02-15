  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { TreeItemProvider } from '../../contexts';
/**
 * Render the final JSX of TreeItem
 */ export const renderTreeItem_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: /*#__PURE__*/ _jsx(TreeItemProvider, {
            value: contextValues.treeItem,
            children: state.root.children
        })
    });
};
