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
      },
    },
    heading: {
      _: "font-light",
      1: "text-4xl",
      2: "text-3xl",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [componentsClassPlugin],
  presets: [require("./base.config")],
};
