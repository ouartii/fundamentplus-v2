/** Design tokens FundamentPlus – afgeleid van het logo (vier figuren + huis) */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        ink: "#24202A",        // koppen
        body: "#4A4552",       // lopende tekst (9,0:1 op wit)
        stone: "#5B5B5B",      // grijs uit het woordmerk
        mute: "#6B6573",
        line: "#E9E1DA",
        paper: "#FFFAF5",      // warme achtergrond
        // de vier figuren uit het logo
        plum: { DEFAULT: "#9D258F", soft: "#F5E6F3", deep: "#7A1C6F" },
        berry: { DEFAULT: "#ED008C", soft: "#FDE6F2" },
        sun: { DEFAULT: "#FF8804", soft: "#FFF0DE", text: "#B45309" },
        sky: { DEFAULT: "#00AAED", soft: "#E3F5FD", deep: "#006E9A" },
      },
      fontFamily: {
        display: ['"Quicksand Variable"', "Quicksand", "ui-rounded", "system-ui", "sans-serif"],
        sans: ['"Nunito Sans Variable"', "Nunito Sans", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { wrap: "1200px" },
      borderRadius: { blob: "2.25rem" },
      boxShadow: { soft: "0 18px 50px -24px rgba(36,32,42,.35)" },
    },
  },
  plugins: [],
};
