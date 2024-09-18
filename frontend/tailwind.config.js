// Use ES6 module syntax

import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"], // Correct path for content files
  darkMode: "class",
  theme: {
    screens: {
      md: { max: "1050px" },
      sa: { max: "550px" },
    },
    extend: {
      colors: {
        '171313': "var(--171313)",
        black: {
          900: "var(--black_900)",
          "900_8a": "var(--black_900_8a)",
          "900_3f": "var(--black_900_3f)",
          "black_409": "var(--black_409)",
        },
        blue_gray: { 900: "var(--blue_gray_900)" },
        deep_orange: {
          50: "var(--deep_orange_50)",
          a400: "var(--deep_orange_a400)",
        },
        gray: {
          700: "var(--gray_700)",
          900: "var(--gray_900)",
          "900_26": "var(--gray_900_26)",
          "900_78": "var(--gray_900_78)",
        },
        grey: {
          500: "var(--grey_500)",
        },
        light_green: { 50: "var(--light_green_50)" },
        red: {
          900: "var(--red_900)",
          "900_26": "var(--red_900_26)",
        },
        white: {
          a700: "var(--white_a700)",
          500: "var(--white_500)",
        },
        yellow: { 800: "var(--yellow_800)" },
      },
      boxShadow: {
        xs: "0 12px 20px 0 #0000000a",
        sm: "0 4px 4px 0 #0000003f",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      textShadow: {
        ts2: "8px 4px 4px #0000003f",
      },
      backgroundImage: {
        gradient2: "linear-gradient(180deg, #a0000026,#3a000026)",
      },
    },
  },
  plugins: [forms], // Use 'forms' directly instead of 'require'
};
