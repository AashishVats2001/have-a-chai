/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)"],
        fredoka: ["var(--font-fredoka)"],
        playlistScript: ["var(--font-playlist-script)"],
        ttNorms: ["var(--font-tt-norms)"],
        },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
