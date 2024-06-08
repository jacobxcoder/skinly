/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line
          ...require('daisyui/src/theming/themes').light,
          primary: '#071013',
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
