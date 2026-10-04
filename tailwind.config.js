/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Háttér: #2b2b2b (a logóval és a bannerrel egyező)
        space: { 950: '#2b2b2b', 900: '#242424', 800: '#353535' },
        muted: '#a1a1a8',
        neon: { cyan: '#00F0FF', violet: '#8A2BE2', emerald: '#34F5A4' },
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['"Afacad Flux"', 'Poppins', 'sans-serif'],
        minecraft: ['Minecraft', '"Press Start 2P"', 'VT323', 'monospace'],
      },
      letterSpacing: { crisp: '-0.022em' },
    },
  },
  plugins: [],
};
