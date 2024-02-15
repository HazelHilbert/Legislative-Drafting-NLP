//
// Dev utils to detect if nodes have "autoFocus" props.
//
import { getReactFiberFromNode } from './getReactFiberFromNode';
/**
 * Detects if a passed HTML node has "autoFocus" prop on a React's fiber. Is needed as React handles autofocus behavior
 * in React DOM and will not pass "autoFocus" to an actual HTML.
 *
 * @param node
 */ function hasAutofocusProp(node) {
    // https://github.com/facebook/react/blob/848bb2426e44606e0a55dfe44c7b3ece33772485/packages/react-dom/src/client/ReactDOMHostConfig.js#L157-L166
    const isAutoFocusableElement = node.nodeName === 'BUTTON' || node.nodeName === 'INPUT' || node.nodeName === 'SELECT' || node.nodeName === 'TEXTAREA';
    if (isAutoFocusableElement) {
        var _getReactFiberFromNode;
        return !!((_getReactFiberFromNode = getReactFiberFromNode(node)) === null || _getReactFiberFromNode === void 0 ? void 0 : _getReactFiberFromNode.pendingProps.autoFocus);
    }
    return false;
}
export function hasAutofocusFilter(node) {
    return hasAutofocusProp(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}
