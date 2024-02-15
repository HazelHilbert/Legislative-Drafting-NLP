"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "warnIfElementTypeIsInvalid", {
    enumerable: true,
    get: function() {
        return warnIfElementTypeIsInvalid;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _reactis = require("react-is");
function warnIfElementTypeIsInvalid(type) {
    if (process.env.NODE_ENV === 'development' && typeof type === 'object' && !(0, _reactis.isValidElementType)(type)) {
        // eslint-disable-next-line no-console
        console.error(`@fluentui/react-jsx-runtime:
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: ${type}.

If this happened in a slot of Fluent UI component, you might be facing package resolution issues.
Please make sure you don't have multiple versions of "@fluentui/react-utilities" installed in your dependencies or sub-dependencies.
You can check this by searching up for matching entries in a lockfile produced by your package manager (yarn.lock, pnpm-lock.yaml or package-lock.json).`);
    }
}
