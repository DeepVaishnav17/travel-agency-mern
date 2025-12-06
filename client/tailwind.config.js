/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Sky blue for travel
        secondary: '#f97316', // Orange for call-to-actions
      }
    },
  },
  plugins: [],
}