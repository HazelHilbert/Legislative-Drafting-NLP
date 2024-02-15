import './constants.esm.js';
import { debugData } from './devtools/store.esm.js';
import { isDevToolsEnabled } from './devtools/isDevToolsEnabled.esm.js';
import { getSourceURLfromError } from './devtools/getSourceURLfromError.esm.js';
import { insertionFactory } from './insertionFactory.esm.js';
import { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots.esm.js';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
function __styles(classesMapBySlot, cssRules, factory = insertionFactory) {
  const insertStyles = factory();
  let ltrClassNamesForSlots = null;
  let rtlClassNamesForSlots = null;
  let sourceURL;
  if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled) {
    sourceURL = getSourceURLfromError();
  }
  function computeClasses(options) {
    const {
      dir,
      renderer
    } = options;
    const isLTR = dir === 'ltr';
    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        ltrClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }
    insertStyles(renderer, cssRules);
    const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;
    if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled) {
      debugData.addSequenceDetails(classNamesForSlots, sourceURL);
    }
    return classNamesForSlots;
  }
  return computeClasses;
}

export { __styles };
//# sourceMappingURL=__styles.esm.js.map
