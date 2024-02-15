import { defaultOptions, FOCUS_VISIBLE_ATTR, FOCUS_WITHIN_ATTR } from './constants';
/**
 * Creates a style for @see makeStyles that includes the necessary selectors for focus.
 * Should be used only when @see createFocusOutlineStyle does not fit requirements
 *
 * If you're using `createCustomFocusIndicatorStyle` instead of `createFocusOutlineStyle`
 * keep in mind that the default outline style is not going to be removed
 * (as it is in `createFocusOutlineStyle`),
 * and is your responsibility to manually remove it from your styles.
 *
 * @example
 * ```ts
 * // Link styles
 * const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    textDecorationColor: tokens.colorStrokeFocus2,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    outlineStyle: 'none',
  }),
  // Common styles.
  root: {
    // ❗️ DO NOT FORGET TO REMOVE THE DEFAULT OUTLINE STYLE
    ':focus-visible': {
      outlineStyle: 'none',
    },
 * ```
 *
 * @param style - styling applied on focus, defaults to @see getDefaultFocusOutlineStyles
 * @param options - Configure the style of the focus outline
 */ export function createCustomFocusIndicatorStyle(style, { selector: selectorType = defaultOptions.selector, customizeSelector = defaultOptions.customizeSelector } = defaultOptions) {
    return {
        [customizeSelector(createBaseSelector(selectorType))]: style
    };
}
function createBaseSelector(selectorType) {
    switch(selectorType){
        case 'focus':
            return `&[${FOCUS_VISIBLE_ATTR}]`;
        case 'focus-within':
            return `&[${FOCUS_WITHIN_ATTR}]:focus-within`;
    }
}
