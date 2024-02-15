  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { TableContextProvider } from '../../contexts/tableContext';
/**
 * Render the final JSX of Table
 */ export const renderTable_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(TableContextProvider, {
        value: contextValues.table,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
