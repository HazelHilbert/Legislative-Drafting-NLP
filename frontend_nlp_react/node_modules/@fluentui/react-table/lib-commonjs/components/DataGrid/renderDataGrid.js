"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderDataGrid_unstable", {
    enumerable: true,
    get: function() {
        return renderDataGrid_unstable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _renderTable = require("../Table/renderTable");
const _dataGridContext = require("../../contexts/dataGridContext");
const renderDataGrid_unstable = (state, contextValues)=>{
    return /*#__PURE__*/ _react.createElement(_dataGridContext.DataGridContextProvider, {
        value: contextValues.dataGrid
    }, (0, _renderTable.renderTable_unstable)(state, contextValues));
};
