/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'var(--font-sans)', 'Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Pretendard', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'Monaco', 'monospace'],
        serif: ['var(--font-serif)', 'Noto Serif KR', 'Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // K-Beauty 브랜드 컬러 시스템 (달항아리 미색 & 샴페인 골드)
        'sand-beige': '#F9F8F6',
        'cream': '#F9F8F6',
        'rose-gold': {
          DEFAULT: '#D9C2A9',
          light: '#E4D1BC',
          dark: '#C5A88D',
        },
        'charcoal': '#2D2A26',
        'warm-gray': '#6B6560',
        midnight: {
          DEFAULT: "#112240",
          deep: "#1C3A5A",
        },
        "liquid-silver": "#C0C0C0",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "genesis-mesh-a": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.4" },
          "50%": { transform: "translate(14%, -12%) scale(1.15)", opacity: "0.65" },
        },
        "genesis-mesh-b": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1.05)", opacity: "0.35" },
          "50%": { transform: "translate(-18%, 10%) scale(0.92)", opacity: "0.55" },
        },
        "genesis-mesh-c": {
          "0%, 100%": { transform: "translate(-5%, 5%) scale(1)", opacity: "0.25" },
          "50%": { transform: "translate(8%, 18%) scale(1.2)", opacity: "0.45" },
        },
        "genesis-shimmer": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "genesis-drift": {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.15" },
          "50%": { transform: "translateY(-12px) scale(1.08)", opacity: "0.35" },
        },
        "dawn-fog-a": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "1" },
          "50%": { transform: "translate(4%, -3%) scale(1.06)", opacity: "0.92" },
        },
        "dawn-fog-b": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.02)", opacity: "1" },
          "50%": { transform: "translate(-5%, 4%) scale(0.98)", opacity: "0.88" },
        },
        "dawn-fog-c": {
          "0%, 100%": { transform: "translate(-2%, 2%) scale(1)", opacity: "1" },
          "50%": { transform: "translate(3%, 5%) scale(1.04)", opacity: "0.9" },
        },
        "dawn-noise": {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 40%" },
        },
        "dawn-noise-reverse": {
          "0%, 100%": { backgroundPosition: "100% 100%" },
          "50%": { backgroundPosition: "0% 60%" },
        },
        "dawn-drift": {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.55" },
        },
        "midnight-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-0.5deg)" },
          "50%": { transform: "translateY(-14px) rotate(0.5deg)" },
        },
        "midnight-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "midnight-spotlight": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        "cosmetic-scan-lines": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "90px 0" },
        },
        "cosmetic-scan-lines-rev": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-120px 0" },
        },
        "shortform-chaos-glitch": {
          "0%, 100%": { transform: "translate(0,0) skewX(0deg)", filter: "hue-rotate(0deg)" },
          "15%": { transform: "translate(-4px,2px) skewX(-0.8deg)", filter: "hue-rotate(35deg)" },
          "30%": { transform: "translate(3px,-2px) skewX(0.6deg)", filter: "hue-rotate(-25deg)" },
          "45%": { transform: "translate(-2px,-3px)", filter: "hue-rotate(90deg)" },
          "60%": { transform: "translate(2px,2px) skewX(0.5deg)" },
        },
        "shortform-neon-flicker": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.95" },
        },
        "shortform-silver-cta": {
          "0%, 100%": {
            opacity: "0.65",
            boxShadow: "0 0 18px rgba(200,215,235,0.25)",
          },
          "50%": {
            opacity: "1",
            boxShadow: "0 0 42px rgba(230,240,255,0.45), 0 0 80px rgba(192,205,220,0.15)",
          },
        },
        /** Genesis — corner ember (passion) */
        "genesis-amber-ember": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "40%": { opacity: "0.62", transform: "scale(1.04)" },
          "70%": { opacity: "0.48", transform: "scale(0.98)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "genesis-mesh-a": "genesis-mesh-a 22s ease-in-out infinite",
        "genesis-mesh-b": "genesis-mesh-b 28s ease-in-out infinite",
        "genesis-mesh-c": "genesis-mesh-c 18s ease-in-out infinite",
        "genesis-shimmer": "genesis-shimmer 10s ease-in-out infinite",
        "genesis-drift": "genesis-drift 7s ease-in-out infinite",
        "dawn-fog-a": "dawn-fog-a 32s ease-in-out infinite",
        "dawn-fog-b": "dawn-fog-b 38s ease-in-out infinite",
        "dawn-fog-c": "dawn-fog-c 26s ease-in-out infinite",
        "dawn-noise": "dawn-noise 48s linear infinite",
        "dawn-noise-reverse": "dawn-noise-reverse 56s linear infinite",
        "dawn-drift": "dawn-drift 6s ease-in-out infinite",
        "midnight-float": "midnight-float 7s ease-in-out infinite",
        "midnight-shimmer": "midnight-shimmer 8s linear infinite",
        "midnight-spotlight": "midnight-spotlight 5.5s ease-in-out infinite",
        "cosmetic-scan-lines": "cosmetic-scan-lines 16s linear infinite",
        "cosmetic-scan-lines-rev": "cosmetic-scan-lines-rev 22s linear infinite",
        "shortform-chaos-glitch": "shortform-chaos-glitch 0.28s linear infinite",
        "shortform-neon-flicker": "shortform-neon-flicker 0.45s ease-in-out infinite",
        "shortform-silver-cta": "shortform-silver-cta 2.2s ease-in-out infinite",
        "genesis-amber-ember": "genesis-amber-ember 4.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}