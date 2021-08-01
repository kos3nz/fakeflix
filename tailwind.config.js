const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        gray: colors.warmGray,
      },
      fontFamily: {
        // lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        90: '90%',
      },
      borderWidth: {
        1: '1px',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
        '-100': '-100',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
