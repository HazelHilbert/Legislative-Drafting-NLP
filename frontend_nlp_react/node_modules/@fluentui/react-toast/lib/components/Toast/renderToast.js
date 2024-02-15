  import { jsx as _jsx } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
/**
 * Render the final JSX of Toast
 */ export const renderToast_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsx(BackgroundAppearanceProvider, {
        value: contextValues.backgroundAppearance,
        children: /*#__PURE__*/ _jsx(state.root, {})
    });
};
