/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B21A8', // Royal Purple
        secondary: '#D8B4FE', // Soft Lavender
        accent: '#F59E0B', // Muted Gold
        dark: '#1F2937', // Near Black
        light: '#F3F4F6', // Light Gray
      }
    },
  },
  plugins: [],
}