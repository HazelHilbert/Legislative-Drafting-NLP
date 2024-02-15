  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { ToolbarContext } from './ToolbarContext';
/**
 * Render the final JSX of Toolbar
 */ export const renderToolbar_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(ToolbarContext.Provider, {
        value: contextValues.toolbar,
        children: /*#__PURE__*/ _jsx(state.root, {
            children: state.root.children
        })
    });
};
