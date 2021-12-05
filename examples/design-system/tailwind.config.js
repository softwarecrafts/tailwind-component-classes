const componentsClassPlugin = require("../../index");
module.exports = {
  purge: ["*.html"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {},
  },
  components: {
    extend: {
      btn: {
        success: "bg-green-400 text-gray-900 border-green-700",
        heading: "heading-1",
      },
    },
    heading: {
      _: "font-light",
      1: "text-7xl",
      2: "text-6xl",
    },
  },
  variants: {
    extend: {},
  },
  presets: [require("./base.config")],
};
