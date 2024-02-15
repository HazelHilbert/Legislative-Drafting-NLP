/**
 * Creates a set from a given iterable, in case the iterable is a set itself, returns the given set instead.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createSetFromIterable", {
    enumerable: true,
    get: function() {
        return createSetFromIterable;
    }
});
function createSetFromIterable(iterable) {
    return iterable instanceof Set ? iterable : new Set(iterable);
}
