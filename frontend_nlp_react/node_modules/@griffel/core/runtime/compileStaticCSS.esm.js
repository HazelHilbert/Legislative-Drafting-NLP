import { cssifyObject } from './utils/cssifyObject.esm.js';
import { compileCSSRules } from './compileCSSRules.esm.js';

function compileStaticCSS(property, value) {
  const cssRule = `${property} {${cssifyObject(value)}}`;
  return compileCSSRules(cssRule, false)[0];
}

export { compileStaticCSS };
//# sourceMappingURL=compileStaticCSS.esm.js.map
