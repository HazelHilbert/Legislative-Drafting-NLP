"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getReactCallbackName", {
    enumerable: true,
    get: function() {
        return getReactCallbackName;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function getReactCallbackName(event) {
    if (event._reactName) {
        return event._reactName;
    }
    if (event.dispatchConfig) {
        if (event.dispatchConfig.registrationName) {
            return event.dispatchConfig.registrationName;
        }
        return event.dispatchConfig.phasedRegistrationNames.bubbled;
    }
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(`@fluentui/react-utilities [${getReactCallbackName.name}]:
Passed React.SyntheticEvent does not contain ".dispatchConfig" or "._reactName". This should not happen, please report it to https://github.com/microsoft/fluentui.`);
    }
}
