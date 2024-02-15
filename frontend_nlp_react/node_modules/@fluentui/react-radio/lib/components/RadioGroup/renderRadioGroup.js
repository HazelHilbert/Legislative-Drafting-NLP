  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { RadioGroupContext } from '../../contexts/RadioGroupContext';
/**
 * Render the final JSX of RadioGroup
 */ export const renderRadioGroup_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(RadioGroupContext.Provider, {
        value: contextValues.radioGroup,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
