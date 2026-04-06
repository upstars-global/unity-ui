import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import UiIcon from '../../components/icon/UiIcon.vue'
import { useAppConfig } from '../../composables/useAppConfig'

type IconSize = '24' | '72' | 'full'

const meta = {
  title: 'Components/Icon/Theme Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {
  render: () => ({
    components: { UiIcon },
    setup() {
      const appConfig = useAppConfig()
      const copiedIconName = ref<string | null>(null)
      const iconSize = ref<IconSize>('24')
      const sizeOptions: IconSize[] = ['24', '72', 'full']

      const iconGroups = computed(() => {
        return Object.entries(appConfig.allIcons || {})
          .map(([type, icons]) => ({
            type,
            names: Object.keys(icons || {}).sort(),
          }))
          .filter(({ names }) => names.length > 0)
      })

      const copyIconName = async (name: string) => {
        try {
          if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(name)
          } else {
            const textarea = document.createElement('textarea')
            textarea.value = name
            textarea.style.position = 'fixed'
            textarea.style.opacity = '0'
            document.body.appendChild(textarea)
            textarea.focus()
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
          }

          copiedIconName.value = name
          window.setTimeout(() => {
            if (copiedIconName.value === name) {
              copiedIconName.value = null
            }
          }, 1200)
        } catch (error) {
          console.error('Copy failed', error)
        }
      }

      const iconWrapperClass = computed(() => (
        iconSize.value === 'full'
          ? 'h-4 w-4'
          : ''
      ))

      return {
        copiedIconName,
        copyIconName,
        iconGroups,
        iconSize,
        iconWrapperClass,
        sizeOptions,
      }
    },
    template: `
      <section class="min-h-screen p-6 lg:p-10 bg-bg-deep">
        <div class="mx-auto max-w-7xl ">
          <h2 class="text-title-sm text-content-text-primary">Theme icons</h2>
          <p class="mt-2 text-body-sm text-content-text-secondary">
            Переключай тему в toolbar Storybook (alpa / king).
          </p>
          <p class="mt-1 text-body-sm text-content-text-secondary">
            Кликни по карточке иконки, чтобы скопировать её имя.
          </p>

          <div class="mt-4 flex items-center gap-2">
            <button
              v-for="size in sizeOptions"
              :key="size"
              type="button"
              class="rounded-md border px-3 py-1 text-caption transition"
              :class="iconSize === size
                ? 'border-content-text-primary text-content-text-primary'
                : 'border-bg-surface text-content-text-secondary hover:border-primary-brand-active'"
              @click="iconSize = size"
            >
              {{ size }}
            </button>
          </div>

          <div class="mt-6 space-y-8">
            <section
              v-for="group in iconGroups"
              :key="group.type"
            >
              <h3 class="text-title-xs text-content-text-primary">
                {{ group.type }}
              </h3>

              <div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                <article
                  v-for="name in group.names"
                  :key="name"
                  class="cursor-pointer rounded-lg border border-bg-surface bg-bg-surface bg-layer-body p-3 text-content-text-primary transition hover:border-primary-brand-active"
                  :class="group.type === 'flat' ? 'p-4' : ''"
                  @click="copyIconName(name)"
                >
                  <div
                    class="flex items-center justify-center rounded-md bg-layer-alt-2"
                  >
                    <div :class="group.type === 'flat' ? 'h-24 w-24' : iconWrapperClass">
                      <UiIcon :name="name" :size="group.type === 'flat' ? '72' : iconSize" />
                    </div>
                  </div>
                  <p class="mt-2 break-words text-center text-caption text-content-text">
                    {{ name }}
                  </p>
                  <p
                    v-if="copiedIconName === name"
                    class="mt-1 text-center text-caption text-primary-brand-default"
                  >
                    Copied
                  </p>
                </article>
              </div>
            </section>
          </div>
        </div>
      </section>
    `,
  }),
}
