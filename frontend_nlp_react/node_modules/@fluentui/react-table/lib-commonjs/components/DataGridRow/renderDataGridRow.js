"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderDataGridRow_unstable", {
    enumerable: true,
    get: function() {
        return renderDataGridRow_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _columnIdContext = require("../../contexts/columnIdContext");
const renderDataGridRow_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(state.root, {
        children: [
            state.selectionCell && /*#__PURE__*/ (0, _jsxruntime.jsx)(state.selectionCell, {}),
            state.columnDefs.map((columnDef)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_columnIdContext.ColumnIdContextProvider, {
                    value: columnDef.columnId,
                    children: state.renderCell(columnDef, state.dataGridContextValue)
                }, columnDef.columnId))
        ]
    });
};
