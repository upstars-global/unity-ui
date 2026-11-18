import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const DESKTOP_WIDTH = '27rem'

// Figma: Master / scroll-fade. Mask goes from transparent (content side)
// to opaque (edge side); it is applied to the fill, not to the content.
const FADE_MASK_STOPS = 'rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15625) 25%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.84375) 75%, #000 100%'

const TRANSITION = 'all 0.5s'
const MOBILE_OFFSET = 'translateY(450px)'

const TRANSITION_CLASSES = ['modal', 'modal-overlay'].flatMap((name) => [
  `${name}-enter-from`,
  `${name}-enter-active`,
  `${name}-leave-active`,
  `${name}-leave-to`,
])

const modal: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        // Backdrop: wraps every opened modal
        '.ui-modal': {
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'var(--bg-page-overlay)',
        },

        // Positioning of a single modal inside the backdrop
        '.ui-modal__item': {
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center',
          cursor: 'pointer',

          '@screen md': {
            alignItems: 'center',
          },

          '&--blocked': {
            cursor: 'default',
          },
        },

        // Modal window
        '.ui-modal-content': {
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '20rem',
          maxWidth: '100%',
          maxHeight: '80dvh',
          width: '100%',
          overflow: 'hidden',
          cursor: 'default',
          background: 'rgb(var(--component-modal-bg))',
          borderTopLeftRadius: 'var(--component-modal-radius)',
          borderTopRightRadius: 'var(--component-modal-radius)',

          '@screen md': {
            width: DESKTOP_WIDTH,
            borderRadius: 'var(--component-modal-radius)',
          },

          // Desktop only: width follows the content (still capped by the screen)
          '&--hug': {
            '@screen md': {
              width: 'fit-content',
            },
          },

          // Independent of the breakpoint: fills the whole viewport
          '&--fullscreen': {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: 'none',
            justifyContent: 'flex-start',
            borderRadius: '0',

            '@screen md': {
              width: '100%',
              maxWidth: '100%',
              borderRadius: '0',
            },
          },

          // Middle container: takes the remaining height and scrolls inside
          '&__body': {
            position: 'relative',
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            minHeight: '0',
          },

          '&__scroll': {
            flex: '1 1 auto',
            minHeight: '0',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
          },

          '&__fade': {
            position: 'absolute',
            left: '0',
            right: '0',
            height: '2rem',
            opacity: '0',
            pointerEvents: 'none',
            transition: 'opacity 200ms ease-out',

            // Fill in the modal background; the gradient mask only affects this layer
            '&::before': {
              content: "''",
              position: 'absolute',
              inset: '0',
              background: 'var(--bg-page-surface)',
            },

            // 1px line on the edge. Painted after ::before, so it sits on top of the
            // solid fill (a parent border would be covered by the absolute ::before)
            '&::after': {
              content: "''",
              position: 'absolute',
              left: '0',
              right: '0',
              height: '1px',
              background: 'var(--component-modal-header-border)',
            },

            '&--top': {
              top: '0',

              '&::before': {
                maskImage: `linear-gradient(to top, ${FADE_MASK_STOPS})`,
              },

              '&::after': {
                top: '0',
              },
            },

            '&--bottom': {
              bottom: '0',

              '&::before': {
                maskImage: `linear-gradient(to bottom, ${FADE_MASK_STOPS})`,
              },

              '&::after': {
                bottom: '0',
              },
            },

            '&--visible': {
              opacity: '1',
            },
          },
        },

        // Transitions for <transition-group>. Vue builds these class names at
        // runtime, so they are safelisted below to survive Tailwind's purge.
        // Backdrop: fades in/out together with the modal
        '.modal-overlay-enter-active, .modal-overlay-leave-active': {
          transition: TRANSITION,
        },

        '.modal-overlay-enter-from, .modal-overlay-leave-to': {
          opacity: '0',
        },

        // Mobile: fade + slide up from the bottom. From `md`: fade only.
        '.modal-enter-active, .modal-leave-active': {
          transition: TRANSITION,
        },

        '.modal-enter-from, .modal-leave-to': {
          opacity: '0',
          transform: MOBILE_OFFSET,

          '@screen md': {
            transform: 'none',
          },
        },
      })
    }, { safelist: TRANSITION_CLASSES }),
  ],
}

export default modal
