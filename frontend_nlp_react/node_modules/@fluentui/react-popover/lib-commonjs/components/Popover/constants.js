/**
 * @internal
 * The default value of the tooltip's border radius (borderRadiusMedium).
 *
 * Unfortunately, Popper requires it to be specified as a variable instead of using CSS.
 * While we could use getComputedStyle, that adds a performance penalty for something that
 * will likely never change.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "popoverSurfaceBorderRadius", {
    enumerable: true,
    get: function() {
        return popoverSurfaceBorderRadius;
    }
});
const popoverSurfaceBorderRadius = 4;
