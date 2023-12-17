/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4F33D8',
        'black': '#0C0C0C',
        'dark-gray': '#6D6D6D',
        'dark-red': '#D83333',
        'gray': '#C7C7C7',
        'green': '#60D833',
        'light-blue': '#75E2F8',
        'light-gray': '#D9D9D9',
        'light-orange': '#F1C40F',
        'orange': '#E67E22',
        'pastel-green': '#54D8AD',
        'pastel-pink': '#F48FB1',
        'pastel-yellow': '#E7D63D',
        'purple': '#A233D8',
        'red': '#D8336A',
        'white': '#FCFCFC',
        'yellow': '#FFE500',
      }
    },
  },
  plugins: [],
}

