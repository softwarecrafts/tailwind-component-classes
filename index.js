const flattenObject = (objIn, baseKeyIn = undefined) => {
  const { _, ...obj } = objIn;
  const baseValue = _ !== undefined ? `${_} ` : "";
  console.log(obj, baseKeyIn, _);
  return Object.assign(
    {},
    baseKeyIn !== undefined
      ? {
          [`${baseKeyIn}`]: `@apply ${_}`,
        }
      : {},
    ...Object.entries(obj ?? {}).flatMap(([key, values]) => {
      const baseKey = typeof values == "object" && values.hasOwnProperty("_") ? key : baseKeyIn;
      return typeof values == "object"
        ? Object.entries(flattenObject(values, baseKey)).map(([subKey, value]) => {
            console.log(key, subKey, value);

            return {
              [key + (subKey === "DEFAULT" ? "" : subKey === key ? "" : `-${subKey}`)]: `${value}`,
            };
          })
        : [{ [`${key}`]: `@apply ${baseValue}${values}` }];
    })
  );
};

const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([key, value], idx) => fn(value, key, idx)));

module.exports = function ({ addComponents, theme, config, e }) {
  const components = config("components", {});
  console.log(
    objectMap(flattenObject(components), (classes, name) => {
      return [`.${e(name)}`, { [classes]: {} }];
    })
  );
  addComponents(
    objectMap(flattenObject(components), (classes, name) => {
      return [`.${e(name)}`, { [classes]: {} }];
    })
  );
};
