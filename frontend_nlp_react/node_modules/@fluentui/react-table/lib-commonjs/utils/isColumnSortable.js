"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isColumnSortable", {
    enumerable: true,
    get: function() {
        return isColumnSortable;
    }
});
function isColumnSortable(column) {
    return column.compare.length > 0;
}
