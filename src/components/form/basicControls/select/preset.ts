import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const select: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.ui-select': {
          '.ui-select__icon': {
            flexShrink: '0',
            width: '1.5rem',
            height: '1.5rem',
            color: 'var(--component-input-icon)',
          },
          '.ui-select__text': {
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
          '&--error .ui-select__label': {
            color: 'var(--component-input-error-label)',
          },
          '.ui-select__list': {
            boxShadow: '0px 0px 16px 0px var(--effect-shadow-default), 0px 0px 4px 2px var(--effect-shadow-default)',
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
          '.ui-input-suggest__item:hover, .ui-input-suggest__item[aria-selected="true"], .ui-input-suggest__item[data-active="true"]': {
            backgroundColor: 'var(--component-input-list-hover)',
          },
        },
      })
    }),
  ],
}

export default select
