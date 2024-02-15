"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    EVENTS: function() {
        return EVENTS;
    },
    TOAST_POSITIONS: function() {
        return TOAST_POSITIONS;
    }
});
const EVENTS = {
    show: 'fui-toast-show',
    dismiss: 'fui-toast-dismiss',
    dismissAll: 'fui-toast-dismiss-all',
    update: 'fui-toast-update',
    pause: 'fui-toast-pause',
    play: 'fui-toast-play'
};
const TOAST_POSITIONS = {
    bottom: 'bottom',
    bottomEnd: 'bottom-end',
    bottomStart: 'bottom-start',
    top: 'top',
    topEnd: 'top-end',
    topStart: 'top-start'
};
