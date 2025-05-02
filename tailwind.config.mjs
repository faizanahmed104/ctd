/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: { max: "639px" },
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1536px" },
      "2xl": { min: "1537px" },
      // container breakpoints
      "container-xs": { max: "639px" },
      "container-sm": { min: "640px", max: "767px" },
      "container-md": { min: "440px", max: "695px" },
      "container-lg": { min: "696px", max: "951px" },
      "container-xl": { min: "952px", max: "1207px" },
      "container-2xl": { min: "1208px", max: "1535px" },
      "container-3xl": { min: "1535px" },
    },
    extend: {
      colors: {
        tealCustom: "#50b69a",
        darkGreenCustom: "#08120f",
        mintGreen: "#bae2d7",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },animation: {
        fadeIn: 'fadeIn 0.2s ease-out'
      }
    },
  },
  plugins: [],
};
