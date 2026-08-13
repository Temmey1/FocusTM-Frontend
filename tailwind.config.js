/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ftm: {
          black: "#080808", deep: "#0f0f0f", charcoal: "#161616", mid: "#222222",
          line: "#2e2e2e", linelt: "#3a3a3a", white: "#f2f0ed", offwhite: "#dcd9d4",
          muted: "rgba(220,217,212,0.50)", dim: "rgba(220,217,212,0.28)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: { widest2: "0.25em", widest3: "0.35em" },
      animation: { marquee: "marquee 32s linear infinite" },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
};
