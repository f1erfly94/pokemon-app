module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luna': {
          'primary': '#6366f1', // фіолетовий
          'secondary': '#4f46e5',
          'background': '#f9fafb',
          'error': '#ef4444',
        }
      },
    },
  },
  plugins: [],
}