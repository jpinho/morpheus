import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#0a0d13",
        tint: "#0d1119",
        panel: "#10151d",
        ink: "#e7eaf0",
        dim: "#8a93a4",
        rule: "#1d2430",
        ceiling: "#e5484d",
        effort: "#7aa2f7",
        effortbg: "#131e33",
        ok: "#46d39a",
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Charter"', "Georgia", '"Times New Roman"', "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "system-ui", "sans-serif"],
        mono: ["ui-monospace", '"SF Mono"', "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.01em",
      },
      maxWidth: {
        readable: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
