import { isHTMLElement } from '@fluentui/react-utilities';
/**
 * The function that normalizes the `mountNode` prop into an object with element and className props.
 *
 * @param mountNode - an HTML element or an object with props
 */ export function toMountNodeProps(mountNode) {
    if (isHTMLElement(mountNode)) {
        return {
            element: mountNode
        };
    }
    if (typeof mountNode === 'object') {
        if (mountNode === null) {
            return {
                element: null
            };
        }
        return mountNode;
    }
    return {};
}
