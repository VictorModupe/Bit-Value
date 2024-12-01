// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './App.{js,jsx,ts,tsx}',
//     './src/**/*.{js,jsx,ts,tsx}',
//   ],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('nativewind/tailwind')],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}