import typographyPreset from "./src/tailwind/presets/typography.preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [typographyPreset],
  content: ['./src/**/*.{vue,ts,tsx,css}', './.storybook/**/*.{ts,css}'],
  theme: {
    fontFamily: {
      sans: [ "var(--font-family)" ],
    },
    screens: {
      "xxs": "320px",   // мінімум, страхує "малий телефон"
      "xs":  "390px",   // базовий мобайл (наша медіана)
      "sm":  "500px",   // великі телефони+landscape
      "md":  "760px",   // tablet portrait
      "lg":  "1020px",  // tablet landscape/small desktop
      "xl":  "1280px",  // базовий desktop (наші медіани 1284–1354)
      "2xl": "1440px",  // large desktop
      "3xl": "1600px"   // extra-large
    },
    fontSize: {

    },
    colors: {
      transparent: "transparent",
      primary: {
        DEFAULT: "rgba(var(--primary-700), <alpha-value>)",
        50: "rgba(var(--primary-50), <alpha-value>)",
        100: "rgba(var(--primary-100), <alpha-value>)",
        200: "rgba(var(--primary-200), <alpha-value>)",
        300: "rgba(var(--primary-300), <alpha-value>)",
        400: "rgba(var(--primary-400), <alpha-value>)",
        500: "rgba(var(--primary-500), <alpha-value>)",
        600: "rgba(var(--primary-600), <alpha-value>)",
        700: "rgba(var(--primary-700), <alpha-value>)",
        800: "rgba(var(--primary-800), <alpha-value>)",
        900: "rgba(var(--primary-900), <alpha-value>)",
      },
      secondary: {
        DEFAULT: "rgba(var(--secondary-500), <alpha-value>)",
        50: "rgba(var(--secondary-50), <alpha-value>)",
        100: "rgba(var(--secondary-100), <alpha-value>)",
        200: "rgba(var(--secondary-200), <alpha-value>)",
        300: "rgba(var(--secondary-300), <alpha-value>)",
        400: "rgba(var(--secondary-400), <alpha-value>)",
        500: "rgba(var(--secondary-500), <alpha-value>)",
        600: "rgba(var(--secondary-600), <alpha-value>)",
        700: "rgba(var(--secondary-700), <alpha-value>)",
        800: "rgba(var(--secondary-800), <alpha-value>)",
        900: "rgba(var(--secondary-900), <alpha-value>)",
      },
      neutral: {
        DEFAULT: "rgba(var(--neutral-500), <alpha-value>)",
        100: "rgba(var(--neutral-100), <alpha-value>)",
        200: "rgba(var(--neutral-200), <alpha-value>)",
        300: "rgba(var(--neutral-300), <alpha-value>)",
        400: "rgba(var(--neutral-400), <alpha-value>)",
        500: "rgba(var(--neutral-500), <alpha-value>)",
        600: "rgba(var(--neutral-600), <alpha-value>)",
        700: "rgba(var(--neutral-700), <alpha-value>)",
        800: "rgba(var(--neutral-800), <alpha-value>)",
        900: "rgba(var(--neutral-900), <alpha-value>)",
      },
      error: {
        DEFAULT: "rgba(var(--error-500), <alpha-value>)",
      },
      warning: {
        DEFAULT: "rgba(var(--warning-500), <alpha-value>)",
      },
      success: {
        DEFAULT: "rgba(var(--success-500), <alpha-value>)",
        100: "rgba(var(--success-100), <alpha-value>)",
        500: "rgba(var(--success-500), <alpha-value>)",
      },
      alt: "var(--color-text-alt)",
      /*body: "var(--color-text-body)",*/
    },
  },
}
