  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { SkeletonContextProvider } from '../../contexts/SkeletonContext';
/**
 * Render the final JSX of Skeleton
 */ export const renderSkeleton_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(SkeletonContextProvider, {
        value: contextValues.skeletonGroup,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
