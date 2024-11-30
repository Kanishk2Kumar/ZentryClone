/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry: ['zentry', "sans-serif"],
        genral: ['general', "sans-serif"],
        'circular-web': ['circular-web', 'sans-serif'],
        'rober-medium': ['rober-medium', 'sans-serif'],
        'rober-regular': ['rober-regular', 'sans-serif'],
      }
    },
    colors: {
      blue: {
        50: "#DFDFF0",
        75: "#dfdff2",
        100: "#F0F2FA",
        200: "#010101",
        300: "#4FB7DD",
      },
      violet: {
        300: "#5724ff",
      },
      yellow: {
        100: "#8e983f",
        300: "#edff66",
      },
      gray: {
        400: "#C9C9C9",
        500: "#B3B3B3",
        600: "#A6A6A6",
        700: "#909090",
        800: "#808080",
      },
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  plugins: [],
}
