/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maindark: {
          100: "#33373e",
          200: "#20232a",
        },
        secondary: "#99750E",
        error: "#D92D18",
      },
    },
  },
  plugins: [],
};
