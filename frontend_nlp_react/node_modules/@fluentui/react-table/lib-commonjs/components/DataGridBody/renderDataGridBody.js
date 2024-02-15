"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderDataGridBody_unstable", {
    enumerable: true,
    get: function() {
        return renderDataGridBody_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _rowIdContext = require("../../contexts/rowIdContext");
const renderDataGridBody_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {
        children: state.rows.map((row)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_rowIdContext.TableRowIdContextProvider, {
                value: row.rowId,
                children: state.renderRow(row)
            }, row.rowId))
    });
};
