"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderTableHeader_unstable", {
    enumerable: true,
    get: function() {
        return renderTableHeader_unstable;
    }
});
const _jsxruntime = require("@fluentui/react-jsx-runtime/jsx-runtime");
const _reactutilities = require("@fluentui/react-utilities");
const _tableHeaderContext = require("../../contexts/tableHeaderContext");
const renderTableHeader_unstable = (state)=>{
    (0, _reactutilities.assertSlots)(state);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_tableHeaderContext.TableHeaderContextProvider, {
        value: "",
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(state.root, {})
    });
};
