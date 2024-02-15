  import { jsx as _jsx, jsxs as _jsxs } from "@fluentui/react-jsx-runtime/jsx-runtime";
import { assertSlots } from '@fluentui/react-utilities';
import { FieldContextProvider, getFieldControlProps } from '../../contexts/index';
/**
 * Render the final JSX of Field
 */ export const renderField_unstable = (state, contextValues)=>{
    assertSlots(state);
    let { children } = state;
    if (typeof children === 'function') {
        children = children(getFieldControlProps(contextValues.field) || {});
    }
    return /*#__PURE__*/ _jsx(FieldContextProvider, {
        value: contextValues === null || contextValues === void 0 ? void 0 : contextValues.field,
        children: /*#__PURE__*/ _jsxs(state.root, {
            children: [
                state.label && /*#__PURE__*/ _jsx(state.label, {}),
                children,
                state.validationMessage && /*#__PURE__*/ _jsxs(state.validationMessage, {
                    children: [
                        state.validationMessageIcon && /*#__PURE__*/ _jsx(state.validationMessageIcon, {}),
                        state.validationMessage.children
                    ]
                }),
                state.hint && /*#__PURE__*/ _jsx(state.hint, {})
            ]
        })
    });
};
