const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#0C1E40",
        bgColor: "#F8F8F8",
        backGround: "#FEFFFE",
        newColor: "#F6F6F6",
      },
      fontFamily: {
        fontHubballi: "Hubballi",
        sansserif: "Titillium Web",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
});
