import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const select: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.ui-select': {
          '&__icon': {
            flexShrink: '0',
            width: '1.5rem',
            height: '1.5rem',
            color: 'var(--component-input-icon)',
            '&--selected': {
              color: 'var(--fg-status-success)'
            }
          },
          '&__text': {
            minWidth: '0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '.ui-select__displayed-value': {
            textAlign: 'left',
          },
          '&--disabled': {
            opacity: 'var(--component-input-disabled-opacity)',
          },
          '.ui-select__list': {
            boxShadow: '0px 0px 16px 0px var(--effect-shadow-default), 0px 0px 4px 2px var(--effect-shadow-default)',
          },
          '&__field': {
            gap: 'var(--component-input-field-gap)',
            backgroundColor: 'var(--component-input-bg)',
            borderColor: 'var(--component-input-bordercolor)',
            borderWidth: 'var(--component-input-borderwidth)',
          },
          '&__label': {
            color: 'var(--component-input-label)',
          },
          '&--open': {
            '.ui-select__field': {
              borderColor: 'var(--component-input-focus-bordercolor)',
            },
            '.ui-select__label': {
              color: 'var(--component-input-focus-label)',
            },
            '.ui-select__dropdown-icon': {
              transform: 'rotate(180deg)',
            },
          },
          '&--error': {
            '.ui-select__field': {
              borderColor: 'var(--component-input-error-bordercolor)',
            },
          }
        },
      })
    }),
  ],
}

export default select
