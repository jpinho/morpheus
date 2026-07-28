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
        paper: "#fbfbfc",
        ink: "#16181d",
        dim: "#6b7280",
        rule: "#dcdfe4",
        tint: "#f1f3f6",
        ceiling: "#8c1d2c",
        effort: "#2f4a85",
        effortbg: "#e9edf6",
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
