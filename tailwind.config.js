/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14283F', // Deep Midnight Navy
          hover: '#0F1E30',
          light: '#1E3B5D',
        },
        background: {
          DEFAULT: '#F5F2EB', // Warm Linen Cream
          card: '#FFFFFF',
          muted: '#EAE6DC',
        },
        brandText: {
          DEFAULT: '#292929', // Charcoal / Off-Black
          muted: '#6E6E6E',
          light: '#8C8C8C',
        },
        accent: {
          DEFAULT: '#A67C52', // Warm Camel / Toffee
          hover: '#8E6740',
          light: '#C49B72',
          muted: '#EADBC8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

