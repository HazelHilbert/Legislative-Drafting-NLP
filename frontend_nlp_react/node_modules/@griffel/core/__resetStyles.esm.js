import { DEBUG_RESET_CLASSES } from './constants.esm.js';
import { insertionFactory } from './insertionFactory.esm.js';

/**
 * @internal
 */
function __resetStyles(ltrClassName, rtlClassName, cssRules, factory = insertionFactory) {
  const insertStyles = factory();
  function computeClassName(options) {
    const {
      dir,
      renderer
    } = options;
    const className = dir === 'ltr' ? ltrClassName : rtlClassName || ltrClassName;
    insertStyles(renderer, Array.isArray(cssRules) ? {
      r: cssRules
    } : cssRules);
    if (process.env.NODE_ENV !== 'production') {
      DEBUG_RESET_CLASSES[className] = 1;
    }
    return className;
  }
  return computeClassName;
}

export { __resetStyles };
//# sourceMappingURL=__resetStyles.esm.js.map
