/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#101d36',
        50: '#e2e5eb',
        100: '#c6c9d1',
        200: '#a9adc0',
        300: '#8d91af',
        400: '#71769f',
        500: '#556b8e',
        600: '#384c6d',
        700: '#2c3b54',
        800: '#202b3b',
        900: '#141a21'
      },
      slate: {
        600: 'rgb(71 85 105)',
        800: '#fff'
      },
      secondary: '#ff5806',
      white: '#141a21',
      gray: {
        DEFAULT: '#9FA6B2',
        50: '#F8F9F9',
        100: '#F1F2F4',
        200: '#E4E6E9',
        300: '#D6D9DE',
        400: '#C8CCD3',
        500: '#B3B9C2',
        600: '#848D9C',
        700: '#6B7585',
        800: '#565D6B',
        900: '#404650'
      },
      success: {
        DEFAULT: '#14A44D',
        50: '#EAFCF2',
        100: '#D6FAE4',
        200: '#ACF5C9',
        300: '#83F0AE',
        400: '#59EA93',
        500: '#1CE26B',
        600: '#118C42',
        700: '#0E7537',
        800: '#0C5D2C',
        900: '#094621'
      },
      danger: {
        DEFAULT: '#DC4C64',
        50: '#FCF2F4',
        100: '#FAE5E9',
        200: '#F5CCD3',
        300: '#F0B2BD',
        400: '#EB99A6',
        500: '#E37285',
        600: '#D42A46',
        700: '#B0233A',
        800: '#8D1C2F',
        900: '#6A1523'
      },
      warning: {
        DEFAULT: '#E4A11B',
        50: '#FDF8EF',
        100: '#FBF2DE',
        200: '#F7E4BE',
        300: '#F4D79D',
        400: '#F0C97D',
        500: '#EAB54C',
        600: '#C48A17',
        700: '#A37313',
        800: '#825C0F',
        900: '#62450B'
      },
      info: {
        DEFAULT: '#54B4D3',
        50: '#F3FAFC',
        100: '#E7F4F9',
        200: '#CEE9F2',
        300: '#B6DFEC',
        400: '#9ED4E6',
        500: '#79C4DC',
        600: '#34A4CA',
        700: '#2B89A8',
        800: '#236D86',
        900: '#1A5265'
      },
      light: '#F9FAFB',
      dark: '#1F2937',
      neutral: {
        50: 'rgb(250 250 250)',
        800: 'rgb(38 38 38)'
      }
    }
  },
  plugins: []
}
