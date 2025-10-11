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
  
  plugins: [],
}

