/**
 * Verifies if an application can use DOM.
 */
function canUseDOM() {
  return typeof window !== 'undefined' && !!(window.document && window.document.createElement);
}

export { canUseDOM };
//# sourceMappingURL=canUseDOM.esm.js.map
