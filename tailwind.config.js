/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B4BDB",    // Ungu elegan
        background: "#F9FAFB", // Terang
        darkGray: "#1F2937",   // Teks utama
      },
    },
  },
  plugins: [],
};