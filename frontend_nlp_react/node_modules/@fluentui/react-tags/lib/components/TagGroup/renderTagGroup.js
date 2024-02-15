  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { TagGroupContextProvider } from '../../contexts/tagGroupContext';
/**
 * Render the final JSX of TagGroup
 */ export const renderTagGroup_unstable = (state, contextValue)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(TagGroupContextProvider, {
        value: contextValue.tagGroup,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
