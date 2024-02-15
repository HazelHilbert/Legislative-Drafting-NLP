/**
 * Trims selectors to generate consistent hashes.
 */
function trimSelector(selector) {
  return selector.replace(/>\s+/g, '>');
}

export { trimSelector };
//# sourceMappingURL=trimSelector.esm.js.map
