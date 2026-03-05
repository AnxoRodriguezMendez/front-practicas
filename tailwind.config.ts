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
        primario: "#F5F77E",
        secundario: "#807EF7",
        "primario-hover": "#e8ea60",
        "secundario-hover": "#6a68e0",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 20px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
