import typographyPreset from "./src/tailwind/presets/typography.preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [typographyPreset],
  content: ['./src/**/*.{vue,ts,tsx,css}', './.storybook/**/*.{ts,css}'],
  theme: {
    fontFamily: {
      sans: [ "var(--font-family)" ],
    },
    fontWeight: {
      normal: "var(--text-fontweight-normal)",
      medium: "var(--text-fontweight-medium)",
      bold: "var(--text-fontweight-bold)",
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
    colors: {
      transparent: "var(--color-transparent)",
      black: "var(--color-black)",
      white: "var(--color-white)",
      "bg-deep": "var(--bg-deep)",
      "bg-surface": "var(--bg-surface)",
      "bg-surface-alt": "var(--bg-surface-alt)",
      "content-status-error": "var(--content-status-error)",
      "content-status-success": "var(--content-status-success)",
      "content-status-warning": "var(--content-status-warning)",
      "content-text-primary": "var(--content-text-primary)",
      "content-text-secondary": "var(--content-text-secondary)",
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
