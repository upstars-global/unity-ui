import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const suggest: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.ui-input-suggest': {
          '&__item': {
            height: '3rem',
            gap: 'var(--spacing-8)',
            padding: 'var(--spacing-8) var(--spacing-12)',
            borderRadius: 'var(--radius-list)',
            color: 'var(--component-input-list-suggest-text-default)',

            '&[aria-selected="true"]': {
              cursor: 'not-allowed',
              '.ui-input-suggest__leading-icon, .ui-input-suggest__label': {
                opacity: '0.45',
              },
            },

            '&:hover, &[data-active="true"]': {
              backgroundColor: 'var(--component-input-list-hover)',
            }
          },
        },
      })
    })
  ],
}

export default suggest
