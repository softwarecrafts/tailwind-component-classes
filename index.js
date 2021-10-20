module.exports = function ({ addComponents, theme }) {
  const components = theme("components", {});
  const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [`.${k}`, fn(v, k, i)]));
  addComponents(objectMap(components, (v) => Object.fromEntries(v.split(" ").map((cl) => [`@apply ${cl}`, {}]))));
};
