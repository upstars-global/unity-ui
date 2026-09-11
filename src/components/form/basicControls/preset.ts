import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const basicControls: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.ui-input': {
          '@apply relative flex flex-col': {},
          gap: 'var(--component-input-gap)',

          '&[data-disabled="true"]': {
            opacity: 'var(--component-input-disabled-opacity)',
          },

          '&:focus-within .ui-input__label': {
            color: 'var(--component-input-focus-label)',
          },

          '&[data-invalid="true"] .ui-input__message': {
            color: 'var(--component-input-error-message)',
          },

          '&:focus-within .ui-input__message, &:focus-within .ui-input__error-message': {
            color: 'var(--component-input-message)',
          },
        },

        '.ui-input__field': {
          '@apply flex items-center w-full overflow-hidden border-solid py-8 px-12': {},
          height: 'var(--component-input-height-default)',
          gap: 'var(--component-input-field-gap)',
          backgroundColor: 'var(--component-input-bg)',
          borderColor: 'var(--component-input-bordercolor)',
          borderStyle: 'solid',
          borderWidth: 'var(--component-input-borderwidth)',
          borderRadius: 'var(--radius-input-default)',

          '&:not(:focus-within):not([data-invalid="true"]):not([data-disabled="true"]):hover': {
            borderColor: 'var(--component-input-hover-bordercolor)',
          },

          '&:focus-within': {
            borderColor: 'var(--component-input-focus-bordercolor)',
          },

          '&[data-invalid="true"]:not(:focus-within)': {
            borderColor: 'var(--component-input-error-bordercolor)',
          },
        },

        '.ui-input__label': {
          '@apply left-0 origin-left transition-all duration-150 ease-out w-full text-body': {},
          color: 'var(--component-input-label)',
        },

        '.ui-input__message': {
          '@apply flex gap-4 text-caption': {},
          paddingInline: 'var(--component-input-message-padding-x)',
          color: 'var(--component-input-message)',

          '&--error': {
            color: 'var(--component-input-error-message)',
          },
          '&--success': {
            color: 'var(--component-input-success-message)',
          }
        },
      })
    }),
  ],
}

export default basicControls
