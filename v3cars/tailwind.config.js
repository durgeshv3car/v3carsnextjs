// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: {
          DEFAULT: "#facc15",
          hover: "#eab308",
          light: "#fef08a",
        },
      },
    }

  },
  plugins: [],
}