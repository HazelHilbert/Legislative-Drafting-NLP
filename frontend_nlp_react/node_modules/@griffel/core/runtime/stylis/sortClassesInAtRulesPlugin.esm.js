import { isAtRuleElement } from './isAtRuleElement.esm.js';

const sortClassesInAtRulesPlugin = element => {
  if (isAtRuleElement(element) && Array.isArray(element.children)) {
    element.children.sort((a, b) => a.props[0] > b.props[0] ? 1 : -1);
  }
};

export { sortClassesInAtRulesPlugin };
//# sourceMappingURL=sortClassesInAtRulesPlugin.esm.js.map
