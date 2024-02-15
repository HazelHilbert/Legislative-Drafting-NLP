  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { AccordionProvider } from '../../contexts/accordion';
/**
 * Function that renders the final JSX of the component
 */ export const renderAccordion_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: /*#__PURE__*/ _jsx(AccordionProvider, {
            value: contextValues.accordion,
            children: state.root.children
        })
    });
};
