const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        gray: colors.warmGray,
        primary: 'rgba(220, 38, 38, 1)', // primary
        paragraph: 'rgba(231, 229, 228, 1)', // gray-200
      },
      fontFamily: {
        // lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        90: '90%',
      },
      height: {
        '9/10': '90vh',
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
