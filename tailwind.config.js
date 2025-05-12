/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can add custom colors to match the gamified UI here
      colors: {
        // Optional: If you want to customize the purple/blue gradient colors
        'purple': {
          '50': '#faf5ff',
          // Add other shades if needed
          '500': '#8b5cf6',
          '600': '#7c3aed',
          '700': '#6d28d9',
        },
        'blue': {
          '50': '#eff6ff',
          // Add other shades if needed
          '500': '#3b82f6',
          '600': '#2563eb',
          '700': '#1d4ed8',
        },
      }
    },
  },
  plugins: [],
}