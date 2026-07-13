/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--color-on-surface-variant) / <alpha-value>)',
        'surface-container-lowest': 'rgb(var(--color-surface-container-lowest) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--color-surface-container-low) / <alpha-value>)',
        'surface-container': 'rgb(var(--color-surface-container) / <alpha-value>)',
        'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',
        outline: 'rgb(var(--color-outline) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'on-secondary': 'rgb(var(--color-on-secondary) / <alpha-value>)',
      },
      spacing: {
        'gutter': '1.5rem',
        'stack-sm': '0.75rem',
        'stack-md': '1.5rem',
        'section-gap-mobile': '2.5rem',
        'section-gap-desktop': '5rem',
      },
      fontSize: {
        'headline-sm': '1.25rem',
        'headline-md': '1.75rem',
        'headline-lg': '2.25rem',
        'headline-xl': '3rem',
        'body-sm': '0.875rem',
        'body-md': '1rem',
        'body-lg': '1.125rem',
        'label-caps': '0.75rem',
      },
      fontFamily: {
        'headline-xl': ['"Inter Tight"', 'Inter', 'sans-serif'],
        'headline-lg': ['"Inter Tight"', 'Inter', 'sans-serif'],
        'headline-md': ['"Inter Tight"', 'Inter', 'sans-serif'],
        'headline-sm': ['"Inter Tight"', 'Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'body-sm': ['Inter', 'sans-serif'],
        'label-caps': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
