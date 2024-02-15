import * as React from 'react';
/**
 * @internal
 * Checks if a given element is a FluentUI trigger (e.g. `MenuTrigger` or `Tooltip`).
 * See the {@link FluentTriggerComponent} type for more info.
 */ export function isFluentTrigger(element) {
    return Boolean(element.type.isFluentTriggerComponent);
}
