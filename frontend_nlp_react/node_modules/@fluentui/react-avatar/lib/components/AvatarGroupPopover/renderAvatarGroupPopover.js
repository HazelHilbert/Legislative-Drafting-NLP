  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { AvatarGroupProvider } from '../../contexts/AvatarGroupContext';
import { assertSlots } from '@fluentui/react-utilities';
import { PopoverTrigger } from '@fluentui/react-popover';
/**
 * Render the final JSX of AvatarGroupPopover
 */ export const renderAvatarGroupPopover_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            /*#__PURE__*/ _jsx(PopoverTrigger, {
                disableButtonEnhancement: true,
                children: /*#__PURE__*/ _jsx(state.tooltip, {
                    children: /*#__PURE__*/ _jsx(state.triggerButton, {})
                })
            }),
            /*#__PURE__*/ _jsx(state.popoverSurface, {
                children: /*#__PURE__*/ _jsx(AvatarGroupProvider, {
                    value: contextValues.avatarGroup,
                    children: /*#__PURE__*/ _jsx(state.content, {})
                })
            })
        ]
    });
};
