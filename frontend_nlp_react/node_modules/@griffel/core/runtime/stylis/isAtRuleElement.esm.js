import { LAYER, SUPPORTS, MEDIA } from 'stylis';

function isAtRuleElement(element) {
  switch (element.type) {
    case '@container':
    case MEDIA:
    case SUPPORTS:
    case LAYER:
      return true;
  }
  return false;
}

export { isAtRuleElement };
//# sourceMappingURL=isAtRuleElement.esm.js.map
