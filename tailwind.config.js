/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic theme tokens (defined in globals.css, swapped by `.dark`)
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          alt: "rgb(var(--surface-alt) / <alpha-value>)",
          strong: "rgb(var(--surface-strong) / <alpha-value>)",
        },
        sunken: "rgb(var(--sunken) / <alpha-value>)",
        line: {
          DEFAULT: "rgb(var(--line) / <alpha-value>)",
          soft: "rgb(var(--line-soft) / <alpha-value>)",
        },
        heading: "rgb(var(--heading) / <alpha-value>)",
        body: "rgb(var(--body) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          strong: "rgb(var(--accent-strong) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
        link: "rgb(var(--link) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        "on-brand": "rgb(var(--on-brand) / <alpha-value>)",

        localhost_text: "#000000",
        purdue_color:"#daaa00",
        links_color: "#2b71bbff",
        uniform_color: "#486bb0",
        linkedin_color: "#0077B5",
        github_color: "#2dba4e",
        gwc_color: "#43D6B9",
        rtc_color: "#ff5900",
        cummins_color: "#D02323",
        emvo_color: "#bf45f9"

      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  
  plugins: [require("@tailwindcss/typography")],
}

