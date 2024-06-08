/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'Inter', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line
          ...require('daisyui/src/theming/themes').light,
          primary: '#FF6542',
          'primary-content': '#FFFFFF',
          base: '#FFFFFF',
          'base-content': '#2A2A2A'
        }
      }
    ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui')
  ]
};
