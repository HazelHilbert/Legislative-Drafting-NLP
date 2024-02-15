  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { BreadcrumbProvider } from './BreadcrumbContext';
/**
 * Render the final JSX of Breadcrumb
 */ export const renderBreadcrumb_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: /*#__PURE__*/ _jsx(BreadcrumbProvider, {
            value: contextValues,
            children: state.list && /*#__PURE__*/ _jsx(state.list, {
                children: state.root.children
            })
        })
    });
};
