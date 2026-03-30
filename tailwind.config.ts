import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./app/**/*.{ts,tsx}","./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent:      { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // legacy compat
        "silk-gold":  { DEFAULT: "hsl(var(--foreground))", light: "hsl(var(--muted-foreground))" },
        "deep-slate": { DEFAULT: "hsl(var(--foreground))", light: "hsl(var(--muted-foreground))" },
        charcoal:     { DEFAULT: "hsl(var(--foreground))", light: "#444", mid: "#666", dark: "#111" },
        sky:          { DEFAULT: "hsl(var(--foreground))", light: "#666", pale: "#f5f5f5", dark: "#111" },
        stone:        { DEFAULT: "#e5e5e5", light: "#f5f5f5", warm: "#999", mid: "#ccc" },
        limestone:    "hsl(var(--background))",
        ivory:        { DEFAULT: "#fafaf8", warm: "#f5f5f3" },
        champagne:    "#f0f0ee",
        obsidian:     "#111",
        graphite:     "#666",
        mist:         "#999",
        beige:        { DEFAULT: "#e5e5e5", light: "#f0f0f0" },
        // Gulf Navy accent system
        navy:         { DEFAULT: "#2C4A6E", light: "#3D6490", dark: "#1E3552", faint: "rgba(44,74,110,0.08)" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))", foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))", "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))", "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))", ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        serif:  ["Cormorant", "Georgia", "serif"],
        sans:   ["DM Sans", "system-ui", "sans-serif"],
        arabic: ["Noto Sans Arabic", "Tahoma", "sans-serif"],
      },
      fontSize: {
        display:  ["clamp(3.5rem, 9vw, 9rem)",   { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "400" }],
        headline: ["clamp(2rem, 4vw, 4.5rem)",    { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "400" }],
        title:    ["clamp(1.4rem, 2.5vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "400" }],
        "body-lg":["1.05rem",                     { lineHeight: "1.8",  fontWeight: "300" }],
      },
      borderRadius: { lg: "0", md: "0", sm: "0", pill: "9999px", glass: "0", "glass-sm": "0", "glass-lg": "0", sharp: "0" },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)", "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.45, 0, 0.55, 1)", spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in":  { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "scale-in": { "0%": { transform: "scale(0.97)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in":        "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in":       "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
