// these functions have been taken from tailwindcss to enable the same API in the config file for components
// If these ever become part of a public API then this file can be dropped

function isObject(input) {
  return typeof input === "object" && input !== null;
}

function isFunction(input) {
  return typeof input === "function";
}

function mergeWith(target, ...sources) {
  let customizer = sources.pop();

  for (let source of sources) {
    for (let k in source) {
      let merged = customizer(target[k], source[k]);

      if (merged === undefined) {
        if (isObject(target[k]) && isObject(source[k])) {
          target[k] = mergeWith(target[k], source[k], customizer);
        } else {
          target[k] = source[k];
        }
      } else {
        target[k] = merged;
      }
    }
  }

  return target;
}

exports.defaults = function defaults(target, ...sources) {
  for (let source of sources) {
    for (let k in source) {
      if (!target?.hasOwnProperty?.(k)) {
        target[k] = source[k];
      }
    }
  }

  return target;
};

exports.collectExtends = function (items) {
  return items.reduce((merged, { extend }) => {
    return mergeWith(merged, extend, (mergedValue, extendValue) => {
      if (mergedValue === undefined) {
        return [extendValue];
      }

      if (Array.isArray(mergedValue)) {
        return [extendValue, ...mergedValue];
      }

      return [extendValue, mergedValue];
    });
  }, {});
};

function mergeExtensionCustomizer(merged, value) {
  // When we have an array of objects, we do want to merge it
  if (Array.isArray(merged) && isObject(merged[0])) {
    return merged.concat(value);
  }

  // When the incoming value is an array, and the existing config is an object, prepend the existing object
  if (Array.isArray(value) && isObject(value[0]) && isObject(merged)) {
    return [merged, ...value];
  }

  // Override arrays (for example for font-families, box-shadows, ...)
  if (Array.isArray(value)) {
    return value;
  }

  // Execute default behaviour
  return undefined;
}

exports.mergeExtensions = function ({ extend, ...theme }) {
  return mergeWith(theme, extend, (themeValue, extensions) => {
    // The `extend` property is an array, so we need to check if it contains any functions
    if (!isFunction(themeValue) && !extensions.some(isFunction)) {
      return mergeWith({}, themeValue, ...extensions, mergeExtensionCustomizer);
    }

    return (resolveThemePath, utils) =>
      mergeWith(
        {},
        ...[themeValue, ...extensions].map((e) => value(e, resolveThemePath, utils)),
        mergeExtensionCustomizer
      );
  });
};
