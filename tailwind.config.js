/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#062644',
        primarygray: 'rgb(166,166,167)',
        secondaryRed: '#38b6ff',
        secondaryBlue: '#38b6ff'
        // secondaryBlue: '#0095D8'
      },
      maxWidth: {
        max: '1300px'
      },
      fontFamily: {
        sans: "Open Sans",
        poppins: "Poppins"
      },
      screens: {
        zr: "0px",
        mb: "430px",
        sm: "640px",
        md: "768px",
        lg: "991px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
}

