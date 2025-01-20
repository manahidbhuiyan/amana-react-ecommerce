/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        themeColor: '#41b883',
        themeColorLight: '#6aca9f',
        themeColorSecondary: '#ff738e',
        themeColor2: '#35495e',
        lightgrey: '#f8f5f5',
        darkgrey: '#aaa',
        textColor: '#212529',
        textColorLight: '#444',
      },
    },
    screens: {
      'xs': '400px',
      'sm': '576px',
      'md': '768px',
      '2md': '991px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'md-lg': { min: '768px', max: '1024px' },
      'lg-xl': { min: '1024px', max: '1200px' }
    },
  },
  plugins: [],
}