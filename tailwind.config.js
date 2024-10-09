/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#fff",
      black: "#000",
      primary: "#04DAFF", // Custom primary color
      secondary: "#fff", // Custom secondary color
      accent: "#FBBF24", // Custom accent color
      active: "#00FF00",
      expired: "#FF0000",
      pending: "#FFFF00",
      // Add more custom colors as needed
    },
  },
  plugins: [],
};
