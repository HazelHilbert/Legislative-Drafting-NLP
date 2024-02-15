import * as React from 'react';
import { createPriorityQueue } from '@fluentui/react-utilities';
function assignDefined(a, b) {
    // This cast is required, as Object.entries will return string as key which is not indexable
    for (const [key, prop] of Object.entries(b)){
        // eslint-disable-next-line eqeqeq
        if (prop != undefined) {
            a[key] = prop;
        }
    }
}
const defaulToastOptions = {
    onStatusChange: undefined,
    priority: 0,
    pauseOnHover: false,
    pauseOnWindowBlur: false,
    position: 'bottom-end',
    timeout: 3000
};
// Multiple toasts can be dispatched in a single tick, use counter to prevent collisions
let counter = 0;
/**
 * Toast are managed outside of the react lifecycle because they can be
 * dispatched imperatively. Therefore the state of toast visibility can't
 * really be managed properly by a declarative lifecycle.
 */ export function createToaster(options) {
    const { limit = Number.POSITIVE_INFINITY } = options;
    const visibleToasts = new Set();
    const toasts = new Map();
    const queue = createPriorityQueue((ta, tb)=>{
        const a = toasts.get(ta);
        const b = toasts.get(tb);
        if (!a || !b) {
            return 0;
        }
        if (a.priority === b.priority) {
            return a.order - b.order;
        }
        return a.priority - b.priority;
    });
    const isToastVisible = (toastId)=>{
        return visibleToasts.has(toastId);
    };
    /**
   * Updates an existing toast with any available option
   */ const updateToast = (toastOptions)=>{
        const { toastId } = toastOptions;
        const toastToUpdate = toasts.get(toastId);
        if (!toastToUpdate) {
            return;
        }
        Object.assign(toastToUpdate, toastOptions);
        toastToUpdate.updateId++;
    };
    /**
   * Dismisses a toast with a specific id
   */ const dismissToast = (toastId)=>{
        visibleToasts.delete(toastId);
    };
    /**
   * Dismisses all toasts and clears the queue
   */ const dismissAllToasts = ()=>{
        visibleToasts.clear();
        queue.clear();
    };
    /**
   * @param toastOptions user configured options
   * @param onUpdate Some toast methods can result in UI changes (i.e. close) use this to dispatch callbacks
   */ const buildToast = (toastOptions, onUpdate)=>{
        var _toast_onStatusChange;
        const { toastId, content, toasterId } = toastOptions;
        if (toasts.has(toastId)) {
            return;
        }
        const close = ()=>{
            var _toast_onStatusChange;
            const toast = toasts.get(toastId);
            if (!toast) {
                return;
            }
            visibleToasts.delete(toastId);
            onUpdate();
            (_toast_onStatusChange = toast.onStatusChange) === null || _toast_onStatusChange === void 0 ? void 0 : _toast_onStatusChange.call(toast, null, {
                status: 'dismissed',
                ...toast
            });
        };
        const remove = ()=>{
            const toast = toasts.get(toastId);
            if (!toast) {
                return;
            }
            toasts.delete(toastId);
            if (visibleToasts.size < limit && queue.peek()) {
                const nextToast = toasts.get(queue.dequeue());
                if (!nextToast) {
                    return;
                }
                visibleToasts.add(nextToast.toastId);
            }
            onUpdate();
        };
        const toast = {
            ...defaulToastOptions,
            close,
            remove,
            toastId,
            content,
            updateId: 0,
            toasterId,
            order: counter++,
            data: {},
            imperativeRef: React.createRef()
        };
        assignDefined(toast, options);
        assignDefined(toast, toastOptions);
        toasts.set(toastId, toast);
        (_toast_onStatusChange = toast.onStatusChange) === null || _toast_onStatusChange === void 0 ? void 0 : _toast_onStatusChange.call(toast, null, {
            status: 'queued',
            ...toast
        });
        if (visibleToasts.size >= limit) {
            queue.enqueue(toastId);
        } else {
            visibleToasts.add(toastId);
        }
    };
    return {
        buildToast,
        dismissAllToasts,
        dismissToast,
        isToastVisible,
        updateToast,
        visibleToasts,
        toasts
    };
}
