"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderDataGridHeaderCell_unstable", {
    enumerable: true,
    get: function() {
        return renderDataGridHeaderCell_unstable;
    }
});
const _renderTableHeaderCell = require("../TableHeaderCell/renderTableHeaderCell");
const renderDataGridHeaderCell_unstable = (state)=>{
    return (0, _renderTableHeaderCell.renderTableHeaderCell_unstable)(state);
};
