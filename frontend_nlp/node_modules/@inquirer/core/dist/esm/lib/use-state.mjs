import { withPointer, handleChange } from './hook-engine.mjs';
export function useState(defaultValue) {
    return withPointer((pointer) => {
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
                    handleChange();
                }
            },
        ];
    });
}
