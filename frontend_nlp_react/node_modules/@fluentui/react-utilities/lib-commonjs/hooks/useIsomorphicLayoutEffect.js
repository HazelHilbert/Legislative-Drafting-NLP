"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useIsomorphicLayoutEffect", {
    enumerable: true,
    get: function() {
        return useIsomorphicLayoutEffect;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _index = require("../ssr/index");
const useIsomorphicLayoutEffect = (0, _index.canUseDOM)() ? _react.useLayoutEffect : _react.useEffect;
