import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        navy: {
          50: "#ecf4ff",
          100: "#d8e8ff",
          200: "#b4d1ff",
          300: "#86b2ff",
          400: "#568aff",
          500: "#3264ff",
          600: "#2144f6",
          700: "#1d37d9",
          800: "#1d33ae",
          900: "#182d84",
          950: "#09142e",
        },
        gold: {
          50: "#fdf8ea",
          100: "#f8edbe",
          200: "#f1dc86",
          300: "#e8c457",
          400: "#dfad35",
          500: "#c9941d",
          600: "#aa7316",
          700: "#885214",
          800: "#734217",
          900: "#633817",
          950: "#3a1d08",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 20px 80px rgba(8, 22, 58, 0.28)",
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top, rgba(239, 197, 94, 0.18), transparent 30%), linear-gradient(135deg, #0a1735 0%, #112654 45%, #0b1b41 100%)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

