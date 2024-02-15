  import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { Portal } from '@fluentui/react-portal';
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of Tooltip
 */ export const renderTooltip_unstable = (state)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            state.children,
            state.shouldRenderTooltip && /*#__PURE__*/ _jsx(Portal, {
                mountNode: state.mountNode,
                children: /*#__PURE__*/ _jsxs(state.content, {
                    children: [
                        state.withArrow && /*#__PURE__*/ _jsx("div", {
                            ref: state.arrowRef,
                            className: state.arrowClassName
                        }),
                        state.content.children
                    ]
                })
            })
        ]
    });
};
