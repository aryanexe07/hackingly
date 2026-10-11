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
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        slate: {
          850: "#151e2e",
          925: "#0b1120",
          950: "#070b14",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-cal)", "'Plus Jakarta Sans'", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(16, 185, 129, 0.25)",
        "glow-lg": "0 0 60px -10px rgba(16, 185, 129, 0.35)",
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.08)",
        elevation: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))",
        "mesh-dark": "radial-gradient(at 10% 20%, rgba(16, 185, 129, 0.08) 0px, transparent 50%), radial-gradient(at 90% 10%, rgba(59, 130, 246, 0.08) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(168, 85, 247, 0.05) 0px, transparent 50%)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s infinite",
        "pulse-slow": "pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "floatSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
