/** @type {import('tailwindcss').Config} */

// const withMT = require("@material-tailwind/react/utils/withMT");

const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.tsx", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      "light-brown": "#CB8A58",
      "dark-brown": "#562B1A",
      zinc: "#d4d4d8",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
