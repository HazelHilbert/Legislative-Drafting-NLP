  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { AvatarGroupProvider } from '../../contexts/AvatarGroupContext';
/**
 * Render the final JSX of AvatarGroup
 */ export const renderAvatarGroup_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(AvatarGroupProvider, {
        value: contextValues.avatarGroup,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
