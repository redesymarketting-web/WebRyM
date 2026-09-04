/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020202",
        ember: "#f7651c",
        volt: "#ffec01",
        snow: "#fefcfd",
      },
      fontFamily: {
        display: ["var(--font-display)", "Montserrat", "sans-serif"],
        body: ["var(--font-display)", "Montserrat", "sans-serif"],
        script: ["var(--font-script)", "Caveat", "cursive"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floaty2: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(8px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        floaty2: "floaty2 8s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        pulseSoft: "pulseSoft 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
