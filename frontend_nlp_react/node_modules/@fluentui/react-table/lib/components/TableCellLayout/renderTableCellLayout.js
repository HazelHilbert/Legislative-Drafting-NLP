  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { AvatarContextProvider } from '@fluentui/react-avatar';
/**
 * Render the final JSX of TableCellLayout
 */ export const renderTableCellLayout_unstable = (state, contextValues)=>{
    assertSlots(state);
    return /*#__PURE__*/ _jsxs(state.root, {
        children: [
            state.media && /*#__PURE__*/ _jsx(AvatarContextProvider, {
                value: contextValues.avatar,
                children: /*#__PURE__*/ _jsx(state.media, {})
            }),
            state.content && /*#__PURE__*/ _jsxs(state.content, {
                children: [
                    state.main && /*#__PURE__*/ _jsx(state.main, {
                        children: state.root.children
                    }),
                    state.description && /*#__PURE__*/ _jsx(state.description, {})
                ]
            })
        ]
    });
};
