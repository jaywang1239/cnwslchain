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
          // Tech dark used by the code-drawn hero + dark navbar (2026-10-14)
          tech: "#070D16",
          deep: "#0B1A2E",
        },
      },
      // Typography 2026-10-14: Inter covers Latin; CJK falls through to the
      // self-hosted Noto Sans SC, then to platform CJK faces. Without this the
      // Chinese copy rendered in the visitor's OS default (SimSun/宋体 on some
      // Windows boxes), which read cheap and differed per device.
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-noto-sc)",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Source Han Sans SC",
          "Noto Sans CJK SC",
          "sans-serif",
        ],
      },
      // Elevation scale 2026-10-14: the site previously had only shadow-sm
      // (24 uses) and shadow-lg (2 uses) — flat everywhere. These three rungs
      // give cards, hover states and floats a consistent depth language.
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)",
        raised: "0 2px 4px -1px rgba(15,23,42,0.06), 0 4px 12px -2px rgba(15,23,42,0.08)",
        float: "0 8px 24px -6px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.06)",
        glow: "0 0 0 1px rgba(0,96,174,0.16), 0 10px 30px -10px rgba(0,96,174,0.45)",
      },
      // Hairline borders (0.5–1px, low-alpha slate) instead of full gray-200.
      borderColor: {
        line: "rgba(15,23,42,0.08)",
        "line-strong": "rgba(15,23,42,0.14)",
      },
      keyframes: {
        "product-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "tech-drift": {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.08)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "product-marquee": "product-marquee 42s linear infinite",
        "tech-drift": "tech-drift 18s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
