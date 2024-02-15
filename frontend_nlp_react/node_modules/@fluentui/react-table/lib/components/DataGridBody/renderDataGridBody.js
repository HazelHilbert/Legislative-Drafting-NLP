  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { TableRowIdContextProvider } from '../../contexts/rowIdContext';
/**
 * Render the final JSX of DataGridBody
 */ export const renderDataGridBody_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(state.root, {
        children: state.rows.map((row)=>/*#__PURE__*/ _jsx(TableRowIdContextProvider, {
                value: row.rowId,
                children: state.renderRow(row)
            }, row.rowId))
    });
};
