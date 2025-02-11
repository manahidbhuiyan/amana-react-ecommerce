/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'proxima': ['Proxima Nova', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'times': ['"Times New Roman"', 'serif'],
      },
      colors: {
        themeColor: "#41b883",
        themeColorLight: "#6aca9f",
        themeColorSecondary: "#ff738e",
        themeColor2: "#35495e",
        lightgrey: "#f8f5f5",
        darkgrey: "#aaa",
        textColor: "#212529",
        textColorLight: "#444",
        buttonColor: '#22C55E',
      },
      animation: {
        marquee: "marquee 15s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(200%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
    screens: {
      xs: "400px",
      sm: "576px",
      md: "768px",
      "2md": "991px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "md-lg": { min: "768px", max: "1024px" },
      "lg-xl": { min: "1024px", max: "1200px" },
      "xl-2xl": { min: "1024px", max: "1200px" },
    },
    fontSize: {
      'font-36': '36px',
      'font-32': '32px',
      'font-26': '26px',
      'font-20': '20px',
      'font-18': '18px',
      'font-17': '17px',
      'font-16': '16px',
      'font-15': '15px',
      'font-14': '14px',
      'font-13': '13px',
      'font-12': '12px',
      'font-11': '11px',
      'font-10': '10px',
    },
  },
  plugins: [],
};
