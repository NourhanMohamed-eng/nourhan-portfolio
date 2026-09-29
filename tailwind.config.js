/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0E0F11',
          dot: 'rgba(255, 255, 255, 0.07)',
        },
        surface: {
          DEFAULT: '#15171A',
          hover: '#1B1E22',
          subtle: '#121417',
          active: '#1F2329',
        },
        border: {
          DEFAULT: '#24272C',
          subtle: '#1B1D22',
          strong: '#363A42',
        },
        txt: {
          DEFAULT: '#E8E6E1',
          muted: '#8A8F98',
          subtle: '#5A606A',
        },
        accent: {
          green: '#3DDC97',
          orange: '#FF9F43',
          blue: '#5B9DFF',
          violet: '#A78BFA',
          red: '#FF5C5C',
        },
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', '"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Geist Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        micro: '0.08em',
        caps: '0.12em',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-stream': 'dataStream 1.8s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.92)' },
        },
        dataStream: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
