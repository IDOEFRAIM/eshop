/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          text: 'var(--text)',
          primary: 'var(--primary)',
          glow: 'var(--glow)',
        }
      },
      // --- L'ÂME DE L'ANIMATION : LES EASINGS ---
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)', // L'effet "Apple" : rapide au début, fluide à la fin
        'soft-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      // --- EFFETS VISUELS AVANCÉS ---
      animation: {
        'aurora': 'aurora 20s linear infinite',
        'reveal': 'reveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(5%, 10%) rotate(5deg)' },
          '66%': { transform: 'translate(-5%, 5%) rotate(-5deg)' },
        },
        reveal: {
          '0%': { transform: 'translateY(100%) skewY(10deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) skewY(0deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(2deg)' },
        }
      },
      // --- PERSPECTIVE POUR LES EFFETS 3D ---
      perspective: {
        'none': 'none',
        'tight': '500px',
        'distant': '2000px',
      }
    },
  },
}