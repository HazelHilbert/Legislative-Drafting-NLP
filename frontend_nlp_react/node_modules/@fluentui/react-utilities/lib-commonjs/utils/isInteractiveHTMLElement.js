"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isInteractiveHTMLElement", {
    enumerable: true,
    get: function() {
        return isInteractiveHTMLElement;
    }
});
const _isHTMLElement = require("./isHTMLElement");
function isInteractiveHTMLElement(element) {
    if (!(0, _isHTMLElement.isHTMLElement)(element)) {
        return false;
    }
    const { tagName } = element;
    switch(tagName){
        case 'BUTTON':
        case 'A':
        case 'INPUT':
        case 'TEXTAREA':
            return true;
    }
    return element.isContentEditable;
}
