"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createResizeObserver", {
    enumerable: true,
    get: function() {
        return createResizeObserver;
    }
});
function createResizeObserver(targetWindow, callback) {
    // https://github.com/jsdom/jsdom/issues/3368
    // Add the polyfill here so it is not needed for all unit tests that leverage positioning
    if (process.env.NODE_ENV === 'test') {
        targetWindow.ResizeObserver = class ResizeObserver {
            observe() {
            // do nothing
            }
            unobserve() {
            // do nothing
            }
            disconnect() {
            // do nothing
            }
        };
    }
    return new targetWindow.ResizeObserver(callback);
}
