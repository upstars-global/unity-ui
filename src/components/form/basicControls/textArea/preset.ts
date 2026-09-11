import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const textArea: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.ui-textarea': {
          '&__field': {
            '@apply h-auto items-start': {},
          },

          '&__content': {
            '@apply relative flex min-w-0 flex-1 flex-col': {},
          },

          '&__label': {
            '@apply text-caption font-medium min-w-0 truncate': {},
          },

          '&__value': {
            '@apply text-body font-normal w-full min-w-0 border-0 bg-transparent p-0 outline-none h-[5.25rem] resize-none overflow-scroll leading-[inherit]': {},
            color: 'var(--component-input-value)',

            '&:disabled': {
              '@apply cursor-not-allowed': {},
            },

            '&::placeholder': {
              '@apply font-normal opacity-100': {},
              color: 'var(--component-input-placeholder)',
            },
          },

          '&__message-row': {
            '@apply flex w-full items-start gap-8': {},
          },

          '&__message': {
            '@apply min-w-0 flex-1 px-0': {},
          },

          '&__counter': {
            '@apply shrink-0 text-right ml-auto whitespace-nowrap': {},
          },
        },
      })
    }),
  ],
}

export default textArea
