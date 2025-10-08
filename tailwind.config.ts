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
        // Legacy tokens (kept for compatibility)
        primary: "#0B1221",
        accent: "#0EA5E9",
        secondary: "#7DD3FC",
        textMuted: "#94A3B8",
        surfaceLight: "#F8FAFC",
        // JARVIS/Iron Man theme
        dark: "#000000",
        surface: "#0A0A0A",
        cyan: "#00FFFF",
        electric: "#0080FF",
        neon: "#FF0080",
        textLight: "#FFFFFF",
        textMuted: "#B0B0B0",
        borderMuted: "#1A1A1A",
        glow: "#00FFFF",
        danger: "#FF0040",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,255,255,0.5)",
        "glow-red": "0 0 20px rgba(255,0,128,0.5)",
        "glow-blue": "0 0 20px rgba(0,128,255,0.5)",
        "glow-strong": "0 0 30px rgba(0,255,255,0.8)",
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,255,0.1) 1px, transparent 1px)',
        'hologram': 'linear-gradient(45deg, rgba(0,255,255,0.1) 0%, rgba(0,128,255,0.1) 50%, rgba(255,0,128,0.1) 100%)',
        'scan': 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.3) 50%, transparent 100%)',
      },
      fontFamily: {
        sans: ["Orbitron", "Exo", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 0.15s infinite linear',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,255,255,0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.6)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,255,255,0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;


