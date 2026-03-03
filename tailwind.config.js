/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'windows-blue': '#0078d4',
        'windows-dark-blue': '#005a9e',
        'windows-gray': '#c0c0c0',
        'windows-light-gray': '#e0e0e0',
        'windows-dark-gray': '#808080',
        'desktop-bg': '#008080',
      },
      fontFamily: {
        'windows': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
