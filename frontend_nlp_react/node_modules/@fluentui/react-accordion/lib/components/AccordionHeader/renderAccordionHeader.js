  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { AccordionHeaderProvider } from '../../contexts/accordionHeader';
/**
 * Function that renders the final JSX of the component
 */ export const renderAccordionHeader_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(AccordionHeaderProvider, {
        value: contextValues.accordionHeader,
        children: /*#__PURE__*/ _jsx(state.root, {
            children: /*#__PURE__*/ _jsxs(state.button, {
                children: [
                    state.expandIconPosition === 'start' && state.expandIcon && /*#__PURE__*/ _jsx(state.expandIcon, {}),
                    state.icon && /*#__PURE__*/ _jsx(state.icon, {}),
                    state.root.children,
                    state.expandIconPosition === 'end' && state.expandIcon && /*#__PURE__*/ _jsx(state.expandIcon, {})
                ]
            })
        })
    });
};
