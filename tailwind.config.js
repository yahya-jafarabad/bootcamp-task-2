/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
          colors: {
      "primary": "009BAF#",
      "success": "#ACD373",
      "unsuccess": "#FF5252"
    },
    // fontWeight: {
    //   "100": '100',
    //   "200": '200',
    //   "300": '300',
    //   "400": '400',
    //   "500": '500',
    //   "600": '600',
    //   "700": '700',
    //   "800": '800',
    //   '900': '900',
    // }
      // fontFamily:{
      //   "vazir":url("./assets/fonts/Vazirmatn-Bold.woff2"),
      // }
    },
  },
  plugins: [],
}

