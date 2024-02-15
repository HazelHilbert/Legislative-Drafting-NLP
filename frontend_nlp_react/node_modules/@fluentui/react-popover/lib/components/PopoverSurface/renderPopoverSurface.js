  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
/**
 * Render the final JSX of PopoverSurface
 */ export const renderPopoverSurface_unstable = (state)=>{
    assertSlots(state);
    const surface = /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.withArrow && /*#__PURE__*/ _jsx("div", {
                ref: state.arrowRef,
                className: state.arrowClassName
            }),
            state.root.children
        ]
    });
    if (state.inline) {
        return surface;
    }
    return /*#__PURE__*/ _jsx(Portal, {
        mountNode: state.mountNode,
        children: surface
    });
};
