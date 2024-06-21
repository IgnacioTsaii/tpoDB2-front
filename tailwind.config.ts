// tailwind.config.js

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],   
        'playfair': ['Playfair Display', 'serif'],   
        'roboto-slab': ['Roboto Slab', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'century': ['Century', 'serif'],
      },
      animation: {
        'underline-animation': 'underline-animation 2s linear infinite',
      },
      keyframes: {
        'underline-animation': {
          '0%': { 'background-position': '0% 100%' },
          '100%': { 'background-position': '100% 100%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
