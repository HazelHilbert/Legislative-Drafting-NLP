  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { ColumnIdContextProvider } from '../../contexts/columnIdContext';
/**
 * Render the final JSX of DataGridRow
 */ export const renderDataGridRow_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.selectionCell && /*#__PURE__*/ _jsx(state.selectionCell, {}),
            state.columnDefs.map((columnDef)=>/*#__PURE__*/ _jsx(ColumnIdContextProvider, {
                    value: columnDef.columnId,
                    children: state.renderCell(columnDef, state.dataGridContextValue)
                }, columnDef.columnId))
        ]
    });
};
