"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getBound", {
    enumerable: true,
    get: function() {
        return getBound;
    }
});
const getBound = (value, min, max)=>{
    if (min !== undefined && value === min) {
        if (max === min) {
            return 'both';
        }
        return 'min';
    } else if (max !== undefined && value === max) {
        return 'max';
    }
    return 'none';
};
