/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkIndigo: "#2E1C6A",  // Custom dark indigo
        indigo: "#673DDB",      // Custom indigo
        lightIndigo: "#E0D9FF", // Custom light indigo
      },
    },
  },
  plugins: [],
}
