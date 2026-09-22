import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const select: Partial<Config> = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.ui-select': {
          '@apply relative flex flex-col': {},
          gap: 'var(--component-input-gap)',

          '&--sm .ui-select__field': {
            height: 'var(--component-input-height-sm)',
            padding: 'var(--component-input-padding-sm)',
            borderRadius: 'var(--radius-input-sm)',
          },

          '&--sm .ui-select__content': {
            '@apply h-24': {},
          },

          '&--default .ui-select__field': {
            height: 'var(--component-input-height-default)',
            padding: 'var(--spacing-8) var(--spacing-12)',
            borderRadius: 'var(--radius-input-default)',
          },

          '&--default .ui-select__content': {
            '@apply h-[2.25rem]': {},
          },

          '&--floating-label .ui-select__label': {
            '@apply top-0 translate-y-0 scale-100 text-caption': {},
          },

          '&--floating-label .ui-select__displayed-value': {
            '@apply top-auto bottom-0 translate-y-0 scale-100': {},
          },

          '&--disabled': {
            opacity: 'var(--component-input-disabled-opacity)',
          },

          '&:not([data-open="true"]):not([data-invalid="true"]):not([data-disabled="true"]):hover .ui-select__field': {
            borderColor: 'var(--component-input-hover-bordercolor)',
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

          '&--error .ui-select__field': {
            borderColor: 'var(--component-input-error-bordercolor)',
          },

          '&__field': {
            '@apply flex items-center w-full overflow-hidden border-solid text-left cursor-pointer focus-visible:outline-none disabled:cursor-not-allowed': {},
            gap: 'var(--component-input-field-gap)',
            backgroundColor: 'var(--component-input-bg)',
            borderColor: 'var(--component-input-bordercolor)',
            borderWidth: 'var(--component-input-borderwidth)',
          },

          '&__content': {
            '@apply relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden': {},
          },

          '&__label': {
            '@apply absolute top-1/2 -translate-y-1/2 left-0 origin-left transition-all duration-150 ease-out w-full text-body min-w-0 truncate': {},
            color: 'var(--component-input-label)',
          },

          '&__displayed-value': {
            '@apply absolute z-1 w-full min-w-0 text-body truncate text-left': {},

            '&--value': {
              '@apply font-medium': {},
              color: 'var(--component-input-value)',
            },

            '&--placeholder': {
              color: 'var(--component-input-placeholder)',
            },
          },

          '&__icon': {
            '@apply shrink-0 size-6': {},
            color: 'var(--component-input-icon)',

            '&--selected': {
              color: 'var(--fg-status-success)',
            },
          },

          '&__dropdown-icon': {
            '@apply transition-transform': {},
          },

          '&__action': {
            '@apply ml-auto shrink-0': {},
          },

          '&__list': {
            '@apply z-20 overflow-hidden': {},
            backgroundColor: 'var(--component-input-list-bg)',
            borderRadius: 'var(--radius-list)',
            boxShadow: '0px 0px 16px 0px var(--effect-shadow-default), 0px 0px 4px 2px var(--effect-shadow-default)',
          },
        },
      })
    }),
  ],
}

export default select
