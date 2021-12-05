const getAllConfigs = require("tailwindcss/lib/util/getAllConfigs");
const merge = require("tailwind-merge");

const { mergeExtensions } = require("./util/tailwind");
const { flattenObject } = require("./util/flattenObject");
const { objectMap } = require("./util/objectMap");
const { mergeComponents } = require("./util/mergeComponents");

module.exports = function ({ addComponents, addUtilities, addBase, config, e, theme, variants }) {
  const configs = getAllConfigs.default(config());
  console.log(Object.keys(configs[0]));
  const createTailwindComponentClasses = (classes, name) => {
    return [`.${e(name)}`, { [`@apply ${merge.twMerge(classes)}`]: {} }];
  };

  const base = mergeExtensions(mergeComponents(configs.map((config) => config?.base ?? {})));
  addBase(objectMap(flattenObject(base, { theme, variants }), createTailwindComponentClasses));

  const components = mergeExtensions(mergeComponents(configs.map((config) => config?.components ?? {})));
  addComponents(objectMap(flattenObject(components, { theme, variants }), createTailwindComponentClasses));

  const utilities = mergeExtensions(mergeComponents(configs.map((config) => config?.utilities ?? {})));
  addUtilities(objectMap(flattenObject(utilities, { theme, variants }), createTailwindComponentClasses));
};
