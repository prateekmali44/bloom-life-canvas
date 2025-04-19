import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        hazel: {
          DEFAULT: "#FFDEE2",  // Soft Hazel Pink
          50: "#FFF0F3",
          100: "#FFE4E9",
          200: "#FFDEE2",
          300: "#FFC1CC",
          400: "#FFA3B1",
          500: "#FF8696",
          600: "#FF697B",
          700: "#FF4D60",
          800: "#FF3345",
          900: "#FF172A"
        },
        lavender: {
          DEFAULT: "#D6BCFA",  // Light Lavender
          50: "#F5E6FF",
          100: "#E6CCFF",
          200: "#D6BCFA",
          300: "#C69EF5",
          400: "#B780F0",
          500: "#A862EB",
          600: "#9B47E5",
          700: "#8D2BDE",
          800: "#7F10D7",
          900: "#6A00C0"
        },
        purple: {
          DEFAULT: "#7E69AB",  // Secondary Purple
          50: "#E6E0F0",
          100: "#CCC1E0",
          200: "#B3A2D1",
          300: "#9B87F5",
          400: "#8269C1",
          500: "#7E69AB",
          600: "#694F96",
          700: "#553A82",
          800: "#40266D",
          900: "#2C1159"
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'color-shift': {
          '0%, 100%': { 
            backgroundColor: 'hsl(330, 100%, 87%)', // Hazel Pink
            color: 'hsl(270, 50%, 40%)' // Purple
          },
          '50%': { 
            backgroundColor: 'hsl(270, 50%, 85%)', // Lavender
            color: 'hsl(330, 100%, 50%)' // Hazel Pink
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'color-shift': 'color-shift 10s ease infinite'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
