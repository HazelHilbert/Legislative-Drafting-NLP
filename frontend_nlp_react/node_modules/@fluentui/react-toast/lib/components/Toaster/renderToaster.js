  import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { AriaLive } from '../AriaLive';
/**
 * Render the final JSX of Toaster
 */ export const renderToaster_unstable = (state)=>{
    const { announceRef, renderAriaLive, inline, mountNode } = state;
    assertSlots(state);
    const hasToasts = !!state.bottomStart || !!state.bottomEnd || !!state.topStart || !!state.topEnd || !!state.top || !!state.bottom;
    const ariaLive = renderAriaLive ? /*#__PURE__*/ _jsx(AriaLive, {
        announceRef: announceRef
    }) : null;
    const positionSlots = /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            state.bottom ? /*#__PURE__*/ _jsx(state.bottom, {}) : null,
            state.bottomStart ? /*#__PURE__*/ _jsx(state.bottomStart, {}) : null,
            state.bottomEnd ? /*#__PURE__*/ _jsx(state.bottomEnd, {}) : null,
            state.topStart ? /*#__PURE__*/ _jsx(state.topStart, {}) : null,
            state.topEnd ? /*#__PURE__*/ _jsx(state.topEnd, {}) : null,
            state.top ? /*#__PURE__*/ _jsx(state.top, {}) : null
        ]
    });
    if (inline) {
        return /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                ariaLive,
                hasToasts ? positionSlots : null
            ]
        });
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            ariaLive,
            hasToasts ? /*#__PURE__*/ _jsx(Portal, {
                mountNode: mountNode,
                children: positionSlots
            }) : null
        ]
    });
};
