import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const suggest: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.ui-input-suggest': {
          '@apply flex flex-col max-h-[20rem] overflow-y-auto overflow-x-hidden gap-4 p-4': {},
          backgroundColor: 'var(--component-input-list-bg)',
          borderRadius: 'var(--radius-list)',

          '&--floating': {
            '@apply absolute top-full left-0 right-0 mt-4': {},
          },

          '&__item': {
            '@apply flex shrink-0 grow-0 items-center cursor-pointer text-nowrap text-left': {},
            height: '3rem',
            gap: 'var(--spacing-8)',
            padding: 'var(--spacing-8) var(--spacing-12)',
            borderRadius: 'var(--radius-list)',

            '&[aria-selected="true"]': {
              backgroundColor: 'var(--component-input-list-bg-selected)',
              cursor: 'not-allowed',
              '.ui-input-suggest__label': {
                '@apply font-medium': {},
              }
            },

            '&:hover:not(&[aria-selected="true"])': {
              backgroundColor: 'var(--component-input-list-bg-hover)',
            },
          },

          '&__label': {
            '@apply truncate text-body': {},
            color: 'var(--component-input-list-fg-value)',
          },

          '&__additional-label': {
            '@apply shrink-0 truncate text-caption': {},
            color: 'var(--component-input-list-fg-secondary)',
          },

          '&__icon': {
            color: 'var(--component-input-list-fg-icon)',
          },

          '&__trailing-icon': {
            '@apply ml-auto': {},
          },

          '&__empty': {
            '@apply text-body font-medium': {},
            color: 'var(--component-input-list-suggest-text-default)',
          },
        },
      })
    }),
  ],
}

export default suggest
