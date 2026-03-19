import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      colors: {
        clinical: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          border: "#e2e8f0",
          text: "#0f172a",
          muted: "#64748b",
          blue: "#0ea5e9",
          "blue-dark": "#0284c7",
          green: "#10b981",
          red: "#ef4444",
          amber: "#f59e0b",
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
        "flash-in": "flash-in 0.5s ease-out",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        "flash-in": {
          "0%": { backgroundColor: "#dbeafe" },
          "100%": { backgroundColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
