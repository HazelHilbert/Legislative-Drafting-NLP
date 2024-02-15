import { insertionFactory } from './insertionFactory.esm.js';
import { resolveStaticStyleRules } from './runtime/resolveStaticStyleRules.esm.js';

function makeStaticStyles(styles, factory = insertionFactory) {
  const insertStyles = factory();
  const stylesSet = Array.isArray(styles) ? styles : [styles];
  function useStaticStyles(options) {
    insertStyles(options.renderer,
    // 👇 static rules should be inserted into default bucket
    {
      d: resolveStaticStyleRules(stylesSet)
    });
  }
  return useStaticStyles;
}

export { makeStaticStyles };
//# sourceMappingURL=makeStaticStyles.esm.js.map
