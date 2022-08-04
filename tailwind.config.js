/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F4F5F7',
        accent: '#FF8947',
        black: '#333333',
        primary: '#F98080',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
