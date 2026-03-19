/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        mono: ['DM Mono', 'monospace'],
        body: ['DM Sans', 'sans-serif'],
      },
    }
  },
  plugins: []
}
