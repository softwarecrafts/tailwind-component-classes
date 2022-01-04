// lifted and slightly modified from Tailwind source with file of the same name
const defaultConfig = require("tailwindcss/defaultConfig");

const getAllConfigs = function (config) {
  const configs = (config?.presets ?? [defaultConfig])
    .slice()
    .reverse()
    .flatMap((preset) => getAllConfigs(preset instanceof Function ? preset() : preset));

  return [config, ...configs];
};
exports.getAllConfigs = getAllConfigs;
