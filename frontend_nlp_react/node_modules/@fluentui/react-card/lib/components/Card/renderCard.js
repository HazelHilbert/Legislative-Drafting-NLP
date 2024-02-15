  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { CardProvider } from './CardContext';
/**
 * Render the final JSX of Card.
 */ export const renderCard_unstable = (state, cardContextValue)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: /*#__PURE__*/ _jsxs(CardProvider, {
            value: cardContextValue,
            children: [
                state.checkbox ? /*#__PURE__*/ _jsx(state.checkbox, {}) : null,
                state.floatingAction ? /*#__PURE__*/ _jsx(state.floatingAction, {}) : null,
                state.root.children
            ]
        })
    });
};
