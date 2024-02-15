import * as React from 'react';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
/**
 * @internal
 * creates a ReactElement from a slot declaration
 */ export function createElementFromSlotComponent(type, overrideChildren) {
    const { elementType, renderFunction, props } = getMetadataFromSlotComponent(type);
    if (renderFunction) {
        if (overrideChildren.length > 0) {
            props.children = React.createElement(React.Fragment, {}, ...overrideChildren);
        }
        return React.createElement(React.Fragment, {}, renderFunction(elementType, props));
    }
    return React.createElement(elementType, props, ...overrideChildren);
}
