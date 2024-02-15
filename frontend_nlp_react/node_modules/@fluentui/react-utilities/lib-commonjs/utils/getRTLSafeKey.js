/**
 * @internal
 * Finds and swaps a provided key for it's right to left format.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRTLSafeKey", {
    enumerable: true,
    get: function() {
        return getRTLSafeKey;
    }
});
const getRTLSafeKey = (key, dir)=>{
    if (dir === 'rtl') {
        switch(key){
            case 'ArrowLeft':
                {
                    return 'ArrowRight';
                }
            case 'ArrowRight':
                {
                    return 'ArrowLeft';
                }
        }
    }
    return key;
};
