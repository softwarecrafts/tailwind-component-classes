const componentsClassPlugin = require("../../index");
module.exports = {
  purge: ["*.html"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {},
  },
  components: {
    btn: { _: "shadow text-blue-900 border border-blue-400 px-4 py-2", error: "text-red-900 border-red-500" },
    heading: {
      _: "font-bold",
      1: "text-4xl",
      2: "text-3xl",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [componentsClassPlugin],
};
