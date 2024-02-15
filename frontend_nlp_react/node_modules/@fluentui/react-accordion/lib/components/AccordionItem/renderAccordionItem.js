  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { AccordionItemProvider } from '../../contexts/accordionItem';
/**
 * Function that renders the final JSX of the component
 */ export const renderAccordionItem_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: /*#__PURE__*/ _jsx(AccordionItemProvider, {
            value: contextValues.accordionItem,
            children: state.root.children
        })
    });
};
