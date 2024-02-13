/** @type {import('tailwindcss').Config} */


// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: ["./src/**/*.tsx", 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
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

    },
  },
  plugins: [require('flowbite/plugin')],
};
// module.exports = withMT({
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });
