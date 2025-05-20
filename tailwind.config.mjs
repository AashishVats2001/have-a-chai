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
      keyframes: {
        'tap-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'tap-bounce': 'tap-bounce 200ms ease-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
