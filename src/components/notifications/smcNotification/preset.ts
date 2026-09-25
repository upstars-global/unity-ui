import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const smcNotification: Partial<Config> = {
  plugins: [
    plugin(({ addBase, addComponents }) => {
      addBase({
        '@keyframes smc-notification-progress': {
          to: { transform: 'translateX(0)' },
        },
        '.smc-notification-enter-active': {
          transition: 'transform 500ms cubic-bezier(0.5, 0, 0, 1), opacity 500ms cubic-bezier(0.5, 0, 0, 1)',
        },
        '.smc-notification-leave-active': {
          transition: 'transform 500ms ease-out, opacity 500ms ease-out',
        },
        '.smc-notification-enter-from': {
          transform: 'translateY(-100vh)',
          opacity: '0',
        },
        '.smc-notification-leave-to': {
          transform: 'translateY(calc(-100% - 1rem))',
          opacity: '0',
        },
      })

      addComponents({
        '.smc-notification': {
          WebkitTapHighlightColor: 'transparent',
          width: '100%',
          background: 'var(--component-smc-notification-gradient)',
          '@screen md': {
            width: '28rem',
            background: 'none',
          },
          '&__card': {
            background: 'var(--component-smc-notification-card-bg)',
            color: 'var(--component-smc-notification-card-fg)',
            boxShadow: 'var(--component-smc-notification-shadow)',
          },
          '&__title': { color: 'var(--component-smc-notification-title-fg)' },
          '&__title :is(b, strong)': { color: 'inherit', fontWeight: 'inherit' },
          '&__message :is(b, strong)': {
            color: 'var(--component-smc-notification-emphasis-fg)',
            fontWeight: 'var(--text-fontweight-bold)',
          },
          '&__copy a': {
            color: 'var(--component-smc-notification-link-fg)',
            textDecoration: 'underline',
          },
          '&__image': {
            width: 'auto',
            height: '100%',
            minWidth: '4rem',
            maxWidth: '5rem',
            minHeight: '4rem',
            maxHeight: '5rem',
            aspectRatio: '1',
            '@screen md': {
              maxWidth: '6rem',
              maxHeight: '6rem',
            },
          },
          '&__actions > *': {
            flex: '1',
            minWidth: '0',
            '@screen md': { flex: 'none' },
          },
          '&__dismiss': {
            background: 'var(--component-smc-notification-dismiss-bg)',
            color: 'var(--component-smc-notification-dismiss-fg)',
            borderColor: 'var(--component-smc-notification-dismiss-bg)',
            boxShadow: 'var(--component-smc-notification-dismiss-shadow)',
            '&--active': { color: 'var(--component-smc-notification-title-fg)' },
          },
          '&__progress': {
            background: 'var(--component-smc-notification-progress-bg)',
            top: '0',
            bottom: '0',
            left: '0',
            width: '100%',
            borderRadius: '0 1.5rem 1.5rem 0',
            transform: 'translateX(-100%)',
            '&--running': { animation: 'smc-notification-progress linear forwards' },
            '&--active': {
              transform: 'translateX(0)',
            },
          },
        },
      })
    }),
  ],
}

export default smcNotification
