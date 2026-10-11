/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        skill: {
          canvas: "#F4F5F7",
          surface: "#FFFFFF",
          subtle: "#F8F9FA",
          border: "rgba(0, 0, 0, 0.05)",
          dark: "#0F172A",
          muted: "#64748B",
          lightMuted: "#94A3B8",
          green: "#22C55E",
          mint: "#86EFAC",
          softMint: "#DCFCE7",
          coral: "#EF4444",
          softCoral: "#FEE2E2",
          peach: "#FED7AA",
          pink: "#FBCFE8",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "3xl": "1.5rem",
        "2xl": "1.125rem",
        xl: "0.875rem",
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-jakarta)", "'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
      boxShadow: {
        skill: "0 2px 12px -2px rgba(15, 23, 42, 0.03), 0 1px 3px 0 rgba(15, 23, 42, 0.02)",
        "skill-card": "0 4px 20px -2px rgba(15, 23, 42, 0.03), 0 1px 2px 0 rgba(15, 23, 42, 0.02)",
        "skill-hover": "0 10px 25px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.02)",
        "skill-pill": "0 2px 8px rgba(0, 0, 0, 0.04)",
        float: "0 20px 40px -10px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
}
