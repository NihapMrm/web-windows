/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        beam: {
          '0%':   { transform: 'translateY(-100%) scaleX(1)',   opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(200%) scaleX(1)',    opacity: '0' },
        },
      },
      animation: {
        beam: 'beam linear infinite',
      },
    },
  },
  plugins: [],
}