"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPositionManager", {
    enumerable: true,
    get: function() {
        return createPositionManager;
    }
});
const _dom = require("@floating-ui/dom");
const _reactutilities = require("@fluentui/react-utilities");
const _utils = require("./utils");
const _listScrollParents = require("./utils/listScrollParents");
const _constants = require("./constants");
const _createResizeObserver = require("./utils/createResizeObserver");
function createPositionManager(options) {
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
    const resizeObserver = disableUpdateOnResize ? null : (0, _createResizeObserver.createResizeObserver)(targetWindow, (entries)=>{
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
            (0, _listScrollParents.listScrollParents)(container).forEach((scrollParent)=>scrollParents.add(scrollParent));
            if ((0, _reactutilities.isHTMLElement)(target)) {
                (0, _listScrollParents.listScrollParents)(target).forEach((scrollParent)=>scrollParents.add(scrollParent));
            }
            scrollParents.forEach((scrollParent)=>{
                scrollParent.addEventListener('scroll', updatePosition, {
                    passive: true
                });
            });
            resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(container);
            if ((0, _reactutilities.isHTMLElement)(target)) {
                resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(target);
            }
            isFirstUpdate = false;
        }
        Object.assign(container.style, {
            position: strategy
        });
        (0, _dom.computePosition)(target, container, {
            placement,
            middleware,
            strategy
        }).then(({ x, y, middlewareData, placement: computedPlacement })=>{
            // Promise can still resolve after destruction
            // early return to avoid applying outdated position
            if (isDestroyed) {
                return;
            }
            (0, _utils.writeArrowUpdates)({
                arrow,
                middlewareData
            });
            (0, _utils.writeContainerUpdates)({
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
            container.dispatchEvent(new CustomEvent(_constants.POSITIONING_END_EVENT));
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
    const updatePosition = (0, _utils.debounce)(()=>forceUpdate());
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
