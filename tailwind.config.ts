import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: "#e91e8c",
          light: "#f472b6",
          dark: "#be185d",
        },
        lilac: "#c084fc",
        gold: "#f59e0b",
      },
    },
  },
  plugins: [],
};
export default config;
