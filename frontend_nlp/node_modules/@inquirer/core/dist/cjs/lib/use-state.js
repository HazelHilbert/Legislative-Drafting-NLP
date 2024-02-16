"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useState = void 0;
const hook_engine_mjs_1 = require('./hook-engine.js');
function useState(defaultValue) {
    return (0, hook_engine_mjs_1.withPointer)((pointer) => {
        if (!pointer.initialized) {
            if (typeof defaultValue === 'function') {
                pointer.set(defaultValue());
            }
            else {
                pointer.set(defaultValue);
            }
        }
        return [
            pointer.get(),
            (newValue) => {
                // Noop if the value is still the same.
                if (pointer.get() !== newValue) {
                    pointer.set(newValue);
                    // Trigger re-render
                    (0, hook_engine_mjs_1.handleChange)();
                }
            },
        ];
    });
}
exports.useState = useState;
