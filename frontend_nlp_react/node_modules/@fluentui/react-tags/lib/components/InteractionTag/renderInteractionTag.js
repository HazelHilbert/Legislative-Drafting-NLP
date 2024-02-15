  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { InteractionTagContextProvider } from '../../contexts/interactionTagContext';
/**
 * Render the final JSX of InteractionTag
 */ export const renderInteractionTag_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(InteractionTagContextProvider, {
        value: contextValues.interactionTag,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
