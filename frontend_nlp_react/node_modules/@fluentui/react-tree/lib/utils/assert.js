import * as React from 'react';
export function assertIsDefinedRef(refObject, msg = `assertIsDefinedRef: reference not properly defined ${refObject}`) {
    // eslint-disable-next-line eqeqeq
    if (refObject.current == undefined && process.env.NODE_ENV === 'development') {
        throw new TypeError(msg);
    }
}
