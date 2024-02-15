  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
/**
 * Render the final JSX of Persona
 */ export const renderPersona_unstable = (state)=>{
    const { presenceOnly, textPosition } = state;
    assertSlots(state);
    const coin = presenceOnly ? state.presence && /*#__PURE__*/ _jsx(state.presence, {}) : state.avatar && /*#__PURE__*/ _jsx(state.avatar, {});
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            (textPosition === 'after' || textPosition === 'below') && coin,
            state.primaryText && /*#__PURE__*/ _jsx(state.primaryText, {}),
            state.secondaryText && /*#__PURE__*/ _jsx(state.secondaryText, {}),
            state.tertiaryText && /*#__PURE__*/ _jsx(state.tertiaryText, {}),
            state.quaternaryText && /*#__PURE__*/ _jsx(state.quaternaryText, {}),
            textPosition === 'before' && coin
        ]
    });
};
