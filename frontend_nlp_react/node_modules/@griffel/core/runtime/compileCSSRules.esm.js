import { serialize, compile, middleware, stringify, rulesheet } from 'stylis';
import { globalPlugin } from './stylis/globalPlugin.esm.js';
import { prefixerPlugin } from './stylis/prefixerPlugin.esm.js';
import { sortClassesInAtRulesPlugin } from './stylis/sortClassesInAtRulesPlugin.esm.js';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
function compileCSSRules(cssRules, sortClassesInAtRules) {
  const rules = [];
  serialize(compile(cssRules), middleware([globalPlugin, sortClassesInAtRules ? sortClassesInAtRulesPlugin : noop, prefixerPlugin, stringify,
  // 💡 we are using `.insertRule()` API for DOM operations, which does not support
  // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
  // individual rules to be used with this API
  rulesheet(rule => rules.push(rule))]));
  return rules;
}

export { compileCSSRules };
//# sourceMappingURL=compileCSSRules.esm.js.map
