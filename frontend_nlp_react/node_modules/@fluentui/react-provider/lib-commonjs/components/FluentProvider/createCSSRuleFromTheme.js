/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCSSRuleFromTheme", {
    enumerable: true,
    get: function() {
        return createCSSRuleFromTheme;
    }
});
function createCSSRuleFromTheme(selector, theme) {
    if (theme) {
        const cssVarsAsString = Object.keys(theme).reduce((cssVarRule, cssVar)=>{
            return `${cssVarRule}--${cssVar}: ${theme[cssVar]}; `;
        }, '');
        return `${selector} { ${cssVarsAsString} }`;
    }
    return `${selector} {}`;
}
