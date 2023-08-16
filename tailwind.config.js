const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#0C1E40",
        bgColor: "#F8F8F8",
      },
    },
  },
  plugins: [],
});
