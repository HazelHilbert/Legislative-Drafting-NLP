import { elementContains } from '@fluentui/react-utilities';
import * as React_2 from 'react';
import { setVirtualParent } from '@fluentui/react-utilities';

export { elementContains }

/**
 * A portal provides a way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
export declare const Portal: React_2.FC<PortalProps>;

export declare type PortalProps = {
    /**
     * React children
     */
    children?: React_2.ReactNode;
    /**
     * Where the portal children are mounted on DOM
     *
     * @default a new element on document.body without any styling
     */
    mountNode?: HTMLElement | null | {
        element?: HTMLElement | null;
        className?: string;
    };
};

export declare type PortalState = Pick<PortalProps, 'children'> & {
    mountNode: HTMLElement | null | undefined;
    /**
     * Ref to the root span element as virtual parent
     */
    virtualParentRootRef: React_2.MutableRefObject<HTMLSpanElement | null>;
};

/**
 * Render the final JSX of Portal
 */
export declare const renderPortal_unstable: (state: PortalState) => React_2.ReactElement;

export { setVirtualParent }

/**
 * The function that normalizes the `mountNode` prop into an object with element and className props.
 *
 * @param mountNode - an HTML element or an object with props
 */
export declare function toMountNodeProps(mountNode: PortalProps['mountNode']): {
    element?: HTMLElement | null;
    className?: string;
};

/**
 * Create the state required to render Portal.
 *
 * The returned state can be modified with hooks such as usePortalStyles, before being passed to renderPortal_unstable.
 *
 * @param props - props from this instance of Portal
 */
export declare const usePortal_unstable: (props: PortalProps) => PortalState;

export { }
