import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        dark: 'hsl(var(--dark))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          '100': 'hsl(var(--destructive-100))',
          '200': 'hsl(var(--destructive-200))',
          '300': 'hsl(var(--destructive-300))',
          '400': 'hsl(var(--destructive-400))',
          '500': 'hsl(var(--destructive-500))',
          '600': 'hsl(var(--destructive-600))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        custom: {
          fuchsia: 'hsl(295deg 90% 60%)',
          aquamarine: 'hsl(159.8, 100%, 74.9%)',
          bisque: 'hsl(32.5, 100%, 88.4%)',
          burlywood: 'hsl(33.8, 56.9%, 70%)',
          deepskyblue: 'hsl(195.1, 100%, 50%)',
          cornflowerblue: 'hsl(219, 79%, 66.3%)',
          crimson: 'hsl(348, 83.3%, 47.1%)',
          darkorange: 'hsl(32.9, 100%, 50%)',
          darkturquoise: 'hsl(180.9, 100%, 41%)',
          deeppink: 'hsl(327.6, 100%, 53.9%)',
          hotpink: 'hsl(330, 100%, 70.6%)',
          indianred: 'hsl(0, 53.1%, 58.2%)',
          lightgreen: 'hsl(120, 73.4%, 74.9%)',
          lightsalmon: 'hsl(17.1, 100%, 73.9%)',
          palevioletred: 'hsl(340, 60%, 65%)',
          lightseagreen: 'hsl(176.7, 69.5%, 41.2%)',
          mediumaquamarine: 'hsl(159.6, 50.7%, 60.2%)',
          mediumpurple: 'hsl(259.6, 59.8%, 64.9%)',
          mediumvioletred: 'hsl(322.2, 80.9%, 43.1%)',
          orchid: 'hsl(302.3, 58.9%, 64.7%)',
          plum: 'hsl(300, 47.3%, 74.7%)',
          silver: 'hsl(0, 0%, 75.3%)',
          springgreen: 'hsl(149.9, 100%, 50%)',
          tan: 'hsl(34.3, 43.8%, 68.6%)',
          violet: 'hsl(300, 76.1%, 72.2%)',
          blanchedalmond: 'hsl(36deg 100% 90%)',
          azure: 'hsl(180deg 98% 96%)',
          slateblue: 'hsl(248deg 53% 58%)',
          rosybrown: 'hsl(0deg 25% 65%)',
          sandybrown: 'hsl(28deg 87% 67%)',
          gold: 'hsl(51deg 100% 50%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
