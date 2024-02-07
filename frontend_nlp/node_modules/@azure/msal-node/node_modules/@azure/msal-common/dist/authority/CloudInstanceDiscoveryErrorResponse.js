/*! @azure/msal-common v13.3.1 2023-10-27 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryErrorResponse(response) {
    return (response.hasOwnProperty("error") &&
        response.hasOwnProperty("error_description"));
}

export { isCloudInstanceDiscoveryErrorResponse };
//# sourceMappingURL=CloudInstanceDiscoveryErrorResponse.js.map
