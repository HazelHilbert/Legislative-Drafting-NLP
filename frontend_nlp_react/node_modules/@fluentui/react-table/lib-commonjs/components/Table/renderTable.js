"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTable_unstable", {
    enumerable: true,
    get: function() {
        return renderTable_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _tableContext = require("../../contexts/tableContext");
const renderTable_unstable = (state, contextValues)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_tableContext.TableContextProvider, {
        value: contextValues.table,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
