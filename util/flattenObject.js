const flattenObject = (objIn, funcOpts, baseKeyIn = undefined) => {
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
      const resolvedValues = typeof values == "function" ? values(funcOpts) : values;
      const baseKey = typeof resolvedValues == "object" && resolvedValues.hasOwnProperty("_") ? key : baseKeyIn;
      return typeof resolvedValues == "object"
        ? Object.entries(flattenObject(resolvedValues, funcOpts, baseKey)).map(([subKey, value]) => {
            return {
              [key + (subKey === "DEFAULT" ? "" : subKey === key ? "" : `-${subKey}`)]: `${value}`,
            };
          })
        : [{ [`${key}`]: `@apply ${baseValue}${resolvedValues}` }];
    })
  );
};

exports.flattenObject = flattenObject;
