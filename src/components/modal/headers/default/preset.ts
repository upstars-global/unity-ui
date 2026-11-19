import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const modalHeaderDefault: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        // Figma: Modal / header-modal (type=title)
        '.ui-modal-header-default': {
          display: 'flex',
          // Only the scrollable body shrinks when the modal hits its max height
          flexShrink: '0',
          width: '100%',
          boxSizing: 'border-box',
          alignItems: 'center',
          gap: 'var(--spacing-8)',
          padding: 'var(--spacing-16)',
          overflow: 'hidden',
          color: 'var(--component-modal-fg-primary)',

          // Equal 24px sides keep the title centred
          '&__side': {
            display: 'flex',
            flex: 'none',
            width: '1.5rem',
            height: '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
          },

          '&__title': {
            flex: '1 1 0',
            minWidth: '0',
            maxHeight: '2.5rem',
            overflow: 'hidden',
            textAlign: 'center',
            '@apply text-subtitle': {},
          },

          '&__title-text': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '@apply text-subtitle': {},
          },

          '&__close': {
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            border: '0',
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
          },
        },
      })
    }),
  ],
}

export default modalHeaderDefault
