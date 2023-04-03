/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "logo-text-green": "#C0FF2D",
        "logo-img-yellow": "#FFD648",
      },
    },
  },
  plugins: [require("daisyui")],
};
