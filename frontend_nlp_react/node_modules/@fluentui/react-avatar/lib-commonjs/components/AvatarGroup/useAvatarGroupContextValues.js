"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAvatarGroupContextValues", {
    enumerable: true,
    get: function() {
        return useAvatarGroupContextValues;
    }
});
const useAvatarGroupContextValues = (state)=>{
    const { layout, size } = state;
    const avatarGroup = {
        layout,
        size
    };
    return {
        avatarGroup
    };
};
