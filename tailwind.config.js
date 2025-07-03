// tailwind.config.js
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",         // <- Needed for Tailwind to scan the HTML file
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
