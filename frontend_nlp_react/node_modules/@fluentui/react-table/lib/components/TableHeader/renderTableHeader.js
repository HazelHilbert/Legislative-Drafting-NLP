  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { TableHeaderContextProvider } from '../../contexts/tableHeaderContext';
/**
 * Render the final JSX of TableHeader
 */ export const renderTableHeader_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(TableHeaderContextProvider, {
        value: "",
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
