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
    getInitials: function() {
        return _getInitials.getInitials;
    },
    partitionAvatarGroupItems: function() {
        return _partitionAvatarGroupItems.partitionAvatarGroupItems;
    }
});
const _getInitials = require("./getInitials");
const _partitionAvatarGroupItems = require("./partitionAvatarGroupItems");
