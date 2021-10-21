exports.objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([key, value], idx) => fn(value, key, idx)));
