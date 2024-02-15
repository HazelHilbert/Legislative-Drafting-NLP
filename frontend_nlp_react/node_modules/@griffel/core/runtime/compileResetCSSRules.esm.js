import { serialize, compile, middleware, stringify } from 'stylis';
import { globalPlugin } from './stylis/globalPlugin.esm.js';
import { isAtRuleElement } from './stylis/isAtRuleElement.esm.js';
import { prefixerPlugin } from './stylis/prefixerPlugin.esm.js';
import { rulesheetPlugin } from './stylis/rulesheetPlugin.esm.js';

function compileResetCSSRules(cssRules) {
  const rules = [];
  const atRules = [];
  serialize(compile(cssRules), middleware([globalPlugin, prefixerPlugin, stringify,
  // 💡 we are using `.insertRule()` API for DOM operations, which does not support
  // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
  // individual rules to be used with this API
  rulesheetPlugin((element, rule) => {
    if (isAtRuleElement(element)) {
      atRules.push(rule);
      return;
    }
    rules.push(rule);
  })]));
  return [rules, atRules];
}

export { compileResetCSSRules };
//# sourceMappingURL=compileResetCSSRules.esm.js.map
