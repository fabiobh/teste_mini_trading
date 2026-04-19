/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: "#0B0E11",
        "dark-secondary": "#1E2329",
        primary: "#F3BA2F",
        success: "#0ECB81",
        danger: "#F6465D",
        "gray-text": "#848E9C",
      },
    },
  },
  plugins: [],
};
