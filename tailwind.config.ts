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
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: "#F7F7F7",
          100: "#EFEFEF",
          200: "#E2E2E2",
          300: "#C8C8C8",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
        // Rebrand 2026-09-24: orange → #0060AE blue; ink/primary → slate gray
        // that coordinates with the blue. Accent is a lighter blue used for
        // hover/active states.
        brand: {
          primary: "#1E293B", // slate-800 (was #1A1A1A near-black)
          secondary: "#0060AE", // brand blue (was #FF6600 orange)
          accent: "#2E7BC4", // lighter blue for hover (was #FF8533 orange)
          ink: "#0F172A", // slate-900 (was #111111)
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "product-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "product-marquee": "product-marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
