import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(220 13% 91%)",
        muted: "hsl(210 40% 96%)",
        foreground: "hsl(222 47% 11%)"
      },
      boxShadow: {
        soft: "0 2px 16px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
