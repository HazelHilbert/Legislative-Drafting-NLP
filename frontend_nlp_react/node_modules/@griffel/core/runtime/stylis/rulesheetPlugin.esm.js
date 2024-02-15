/**
 * The same plugin as in stylis, but this version also has "element" argument.
 */
function rulesheetPlugin(callback) {
  return function (element) {
    if (!element.root) {
      if (element.return) {
        callback(element, element.return);
      }
    }
  };
}

export { rulesheetPlugin };
//# sourceMappingURL=rulesheetPlugin.esm.js.map
