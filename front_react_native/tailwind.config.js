/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: "#0F172A",
        "dark-secondary": "#1E293B",
        primary: "#3B82F6", // Modern Blue instead of Yellow
        "primary-light": "#60A5FA",
        success: "#10B981", // Emerald 
        danger: "#EF4444", // Red 500
        "gray-text": "#94A3B8", // Slate 400
        "glass": "rgba(30, 41, 59, 0.7)",
      },
    },
  },
  plugins: [],
};
