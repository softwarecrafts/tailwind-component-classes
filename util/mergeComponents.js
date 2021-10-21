// this is modifed function from tailwind based on the theme object
const { collectExtends, defaults } = require("./tailwind");

exports.mergeComponents = function mergeComponents(components) {
  return {
    ...components.reduce((merged, component) => defaults(merged, component), {}),

    // In order to resolve n config objects, we combine all of their `extend` properties
    // into arrays instead of objects so they aren't overridden.
    extend: collectExtends(components),
  };
};
