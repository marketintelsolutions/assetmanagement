/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#062644',
        primarygray: 'rgb(166,166,167)',
        secondaryRed: '#ed1c24',
        secondaryBlue: '#0095D8'
      },
      maxWidth: {
        max: '1300px'
      },
      fontFamily: {
        sans: "Open Sans",
        poppins: "Poppins"
      }
    },
  },
  plugins: [],
}

