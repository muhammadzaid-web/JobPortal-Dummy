// tailwind.config.js
import daisyui from 'daisyui';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Add your preferred themes
  },
};