import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent:      { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },

        /* ── 2026 Signature Palette ── */
        sky: {
          DEFAULT: "hsl(var(--sky))",
          light:   "hsl(var(--sky-light))",
          pale:    "hsl(var(--sky-pale))",
          dark:    "hsl(var(--sky-dark))",
        },
        stone: {
          DEFAULT: "hsl(var(--stone-mid))",
          light:   "hsl(var(--stone-light))",
          warm:    "hsl(var(--stone-warm))",
        },
        limestone: "hsl(var(--limestone))",
        charcoal:  {
          DEFAULT: "hsl(var(--charcoal))",
          mid:     "hsl(var(--charcoal-mid))",
        },

        /* Legacy compat */
        "silk-gold":  { DEFAULT: "hsl(var(--sky))", light: "hsl(var(--sky-light))", dim: "hsl(var(--sky-dark))" },
        "deep-slate": { DEFAULT: "hsl(var(--charcoal))", light: "hsl(var(--muted-foreground))" },
        "cool-grey":  "hsl(var(--stone-light))",
        champagne:    "hsl(var(--sky-pale))",
        beige:        { DEFAULT: "hsl(var(--border))", light: "hsl(var(--muted))" },
        graphite:     "hsl(var(--charcoal-mid))",
        obsidian:     "hsl(var(--charcoal))",
        mist:         "hsl(var(--stone-warm))",
        ivory:        { DEFAULT: "hsl(var(--limestone))", warm: "hsl(var(--stone-light))" },

        sidebar: {
          DEFAULT:              "hsl(var(--sidebar-background))",
          foreground:           "hsl(var(--sidebar-foreground))",
          primary:              "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent:               "hsl(var(--sidebar-accent))",
          "accent-foreground":  "hsl(var(--sidebar-accent-foreground))",
          border:               "hsl(var(--sidebar-border))",
          ring:                 "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        serif:   ["Cormorant Garamond", "Georgia", "serif"],
        sans:    ["DM Sans", "system-ui", "sans-serif"],
        arabic:  ["Noto Sans Arabic", "Tahoma", "sans-serif"],
      },
      fontSize: {
        display:  ["clamp(2.8rem, 7vw, 6.5rem)",  { lineHeight: "1.0",  letterSpacing: "-0.03em", fontWeight: "400" }],
        headline: ["clamp(1.9rem, 4vw, 3.8rem)",  { lineHeight: "1.1",  letterSpacing: "-0.025em", fontWeight: "400" }],
        title:    ["clamp(1.3rem, 2.5vw, 2.4rem)", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "400" }],
        "body-lg":["1.1rem",                       { lineHeight: "1.85", fontWeight: "300" }],
      },
      borderRadius: {
        lg:        "var(--radius)",
        md:        "calc(var(--radius) - 2px)",
        sm:        "calc(var(--radius) - 4px)",
        pill:      "9999px",
        sharp:     "0px",
        glass:     "20px",
        "glass-sm":"16px",
        "glass-lg":"28px",
      },
      spacing: {
        section:    "10rem",
        "section-md":"7rem",
        "section-sm":"5rem",
        luxury:     "12rem",
      },
      transitionTimingFunction: {
        expo:      "cubic-bezier(0.16, 1, 0.3, 1)",
        spring:    "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth:    "cubic-bezier(0.45, 0, 0.55, 1)",
        "out-expo":"cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in":        { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "scale-in":       { "0%": { transform: "scale(0.95)", opacity: "0" },      "100%": { transform: "scale(1)", opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in":        "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in":       "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
