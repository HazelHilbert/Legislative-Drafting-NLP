/**
 * @internal
 * Clamps `value` to a number between the min and max.
 *
 * @param value - the value to be clamped
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "clamp", {
    enumerable: true,
    get: function() {
        return clamp;
    }
});
const clamp = (value, min, max)=>Math.max(min, Math.min(max, value || 0));
