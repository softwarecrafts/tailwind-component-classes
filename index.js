const getAllConfigs = require("tailwindcss/lib/util/getAllConfigs");
const merge = require("tailwind-merge");

const { mergeExtensions } = require("./util/tailwind");
const { flattenObject } = require("./util/flattenObject");
const { objectMap } = require("./util/objectMap");
const { mergeComponents } = require("./util/mergeComponents");

module.exports = function ({ addComponents, config, e, theme, variants }) {
  const configs = getAllConfigs.default(config());
  const components = mergeExtensions(mergeComponents(configs.map((config) => config?.components ?? {})));
  const createTailwindComponentClasses = (classes, name) => {
    return [`.${e(name)}`, { [`@apply ${merge.twMerge(classes)}`]: {} }];
  };
  addComponents(objectMap(flattenObject(components, { theme, variants }), createTailwindComponentClasses));
};
