/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'light-brown':'#CB8A58',
      'dark-brown':'#562B1A'
    },
    extend: {
      colors: {
        ...colors
      }
    },
  },
  plugins: [],
};
module.exports = withMT({
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
});
