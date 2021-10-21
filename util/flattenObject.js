const flattenObject = (objIn, baseKeyIn = undefined) => {
  const { _, ...obj } = objIn;
  const baseValue = _ !== undefined ? `${_} ` : "";
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
            return {
              [key + (subKey === "DEFAULT" ? "" : subKey === key ? "" : `-${subKey}`)]: `${value}`,
            };
          })
        : [{ [`${key}`]: `@apply ${baseValue}${values}` }];
    })
  );
};

exports.flattenObject = flattenObject;
