const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './providers/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        gray: colors.gray,
        primary: colors.blue,
      },
      fontSize: {
        'display-xxl': [
          '4.5rem',
          {
            lineHeight: '5rem',
            letterSpacing: '-2%',
          },
        ],
        'display-xl': [
          '3.75rem',
          {
            lineHeight: '4rem',
            letterSpacing: '-2%',
          },
        ],
        'display-lg': [
          '3rem',
          {
            lineHeight: '3.75rem',
            letterSpacing: '-2%',
          },
        ],
        'display-md': [
          '2.25rem',
          {
            lineHeight: '2.75rem',
            letterSpacing: '-2%',
          },
        ],
        'display-sm': ['1.875rem', '2.375rem'],
        'display-xs': ['1.5rem', '2rem'],
        xl: ['1.25rem', '1.875rem'],
        lg: ['1.125rem', '1.75rem'],
        md: ['1rem', '1.5rem'],
        sm: ['0.875rem', '1.25rem'],
        xs: ['0.75rem', '1.125rem'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.100'),

            h1: {
              color: theme('colors.gray.50'),
            },
            h2: {
              color: theme('colors.gray.50'),
            },
            a: {
              color: theme('colors.primary.500'),
            },
          },
        },
      }),
    },
    fontFamily: {
      sans: ['var(--font-inter)'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
