import { computePosition } from '@floating-ui/dom';
import { isHTMLElement } from '@fluentui/react-utilities';
import { debounce, writeArrowUpdates, writeContainerUpdates } from './utils';
import { listScrollParents } from './utils/listScrollParents';
import { POSITIONING_END_EVENT } from './constants';
import { createResizeObserver } from './utils/createResizeObserver';
/**
 * @internal
 * @returns manager that handles positioning out of the react lifecycle
 */ export function createPositionManager(options) {
    let isDestroyed = false;
    const { container, target, arrow, strategy, middleware, placement, useTransform = true, disableUpdateOnResize = false } = options;
    const targetWindow = container.ownerDocument.defaultView;
    if (!target || !container || !targetWindow) {
        return {
            updatePosition: ()=>undefined,
            dispose: ()=>undefined
        };
    }
    // When the dimensions of the target or the container change - trigger a position update
    const resizeObserver = disableUpdateOnResize ? null : createResizeObserver(targetWindow, (entries)=>{
        // If content rect dimensions to go 0 -> very likely that `display: none` is being used to hide the element
        // In this case don't update and let users update imperatively
        const shouldUpdateOnResize = entries.every((entry)=>{
            return entry.contentRect.width > 0 && entry.contentRect.height > 0;
        });
        if (shouldUpdateOnResize) {
            updatePosition();
        }
    });
    let isFirstUpdate = true;
    const scrollParents = new Set();
    // When the container is first resolved, set position `fixed` to avoid scroll jumps.
    // Without this scroll jumps can occur when the element is rendered initially and receives focus
    Object.assign(container.style, {
        position: 'fixed',
        left: 0,
        top: 0,
        margin: 0
    });
    const forceUpdate = ()=>{
        // debounced update can still occur afterwards
        // early return to avoid memory leaks
        if (isDestroyed) {
            return;
        }
        if (isFirstUpdate) {
            listScrollParents(container).forEach((scrollParent)=>scrollParents.add(scrollParent));
            if (isHTMLElement(target)) {
                listScrollParents(target).forEach((scrollParent)=>scrollParents.add(scrollParent));
            }
            scrollParents.forEach((scrollParent)=>{
                scrollParent.addEventListener('scroll', updatePosition, {
                    passive: true
                });
            });
            resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(container);
            if (isHTMLElement(target)) {
                resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(target);
            }
            isFirstUpdate = false;
        }
        Object.assign(container.style, {
            position: strategy
        });
        computePosition(target, container, {
            placement,
            middleware,
            strategy
        }).then(({ x, y, middlewareData, placement: computedPlacement })=>{
            // Promise can still resolve after destruction
            // early return to avoid applying outdated position
            if (isDestroyed) {
                return;
            }
            writeArrowUpdates({
                arrow,
                middlewareData
            });
            writeContainerUpdates({
                container,
                middlewareData,
                placement: computedPlacement,
                coordinates: {
                    x,
                    y
                },
                lowPPI: ((targetWindow === null || targetWindow === void 0 ? void 0 : targetWindow.devicePixelRatio) || 1) <= 1,
                strategy,
                useTransform
            });
            container.dispatchEvent(new CustomEvent(POSITIONING_END_EVENT));
        }).catch((err)=>{
            // https://github.com/floating-ui/floating-ui/issues/1845
            // FIXME for node > 14
            // node 15 introduces promise rejection which means that any components
            // tests need to be `it('', async () => {})` otherwise there can be race conditions with
            // JSDOM being torn down before this promise is resolved so globals like `window` and `document` don't exist
            // Unless all tests that ever use `usePositioning` are turned into async tests, any logging during testing
            // will actually be counter productive
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.error('[usePositioning]: Failed to calculate position', err);
            }
        });
    };
    const updatePosition = debounce(()=>forceUpdate());
    const dispose = ()=>{
        isDestroyed = true;
        if (targetWindow) {
            targetWindow.removeEventListener('scroll', updatePosition);
            targetWindow.removeEventListener('resize', updatePosition);
        }
        scrollParents.forEach((scrollParent)=>{
            scrollParent.removeEventListener('scroll', updatePosition);
        });
        scrollParents.clear();
        resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect();
    };
    if (targetWindow) {
        targetWindow.addEventListener('scroll', updatePosition, {
            passive: true
        });
        targetWindow.addEventListener('resize', updatePosition);
    }
    // Update the position on initialization
    updatePosition();
    return {
        updatePosition,
        dispose
    };
}
