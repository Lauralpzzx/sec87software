window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        sepBurgundy: '#691C32',
        sepBurgundyLight: '#9E2A4B',
        sepBurgundyDark: '#521526',
        sepBeige: '#F4F6F9',
        sepBeigeDark: '#E2E8F0',
        sepGold: '#BC955C',
        sepGoldDark: '#9A7B4C',
        sepLightGray: '#F8FAFC',
        sepGreen: '#285C4D',
        sepGreenDark: '#1E453A'
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(105, 28, 50, 0.1)',
        'glow': '0 0 20px rgba(188, 149, 92, 0.4)',
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.2)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-fill': 'progressFill 1.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progressFill: {
          '0%': { width: '0%' },
        }
      }
    }
  }
}

