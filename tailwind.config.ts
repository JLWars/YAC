import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E30613",
          "red-dark": "#B7050F",
          yellow: "#FFC72C",
          "yellow-dark": "#E8A800",
          black: "#141414",
          cream: "#FFF7E6",
        },
        affaires: {
          anthracite: "#2B2B2B",
          "anthracite-light": "#333333",
          "anthracite-dark": "#222222",
          "anthracite-deep": "#1A1A1A",
          card: "#242424",
          red: "#E23A2E",
          "red-dark": "#C22F25",
          yellow: "#F5C518",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(-3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        wiggle: "wiggle 2.4s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
