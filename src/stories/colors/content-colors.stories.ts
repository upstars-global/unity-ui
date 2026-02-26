import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Foundation/Colors/Content',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Cards: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => ({
    setup() {
      const statuses = [
        { label: 'Success', className: 'bg-content-status-success' },
        { label: 'Warning', className: 'bg-content-status-warning' },
        { label: 'Error', className: 'bg-content-status-error' },
      ]

      return { statuses }
    },
    template: `
      <div class="min-h-screen bg-bg-deep p-6 lg:p-10">
        <div class="mx-auto grid max-w-5xl gap-6">
          <h2 class="text-title-sm text-content-text-primary">
            Content colors: page + surface cards
          </h2>

          <section class="rounded-xl border border-white/20 p-5">
            <div class="mb-2 text-caption text-content-text-secondary">
              На странице (без карточки)
            </div>
            <h3 class="text-subtitle text-content-text-primary">Primary text</h3>
            <p class="mt-2 text-body-sm text-content-text-secondary">Secondary text</p>
            <a href="#" class="mt-3 inline-flex text-link text-body-sm">Link example</a>
            <div class="mt-4 text-caption text-content-text-secondary">Badges / text-content-text-primary</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="status in statuses"
                :key="'page-' + status.label"
                :class="status.className"
                class="rounded-full px-2.5 py-1 text-caption text-content-text-primary"
              >
                {{ status.label }}
              </span>
            </div>
            <div class="mt-3 text-caption text-content-text-secondary">Badges / text-content-text-secondary</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="status in statuses"
                :key="'page-secondary-' + status.label"
                :class="status.className"
                class="rounded-full px-2.5 py-1 text-caption text-content-text-secondary"
              >
                {{ status.label }}
              </span>
            </div>
          </section>

          <article class="rounded-xl bg-bg-surface p-5 shadow-sm">
            <div class="mb-2 text-caption text-content-text-secondary">
              Карточка слой 1 (bg-surface)
            </div>
            <h3 class="text-subtitle text-content-text-primary">Primary text</h3>
            <p class="mt-2 text-body-sm text-content-text-secondary">Secondary text</p>
            <a href="#" class="mt-3 inline-flex text-link text-body-sm">Link example</a>
            <div class="mt-4 text-caption text-content-text-secondary">Badges / text-content-text-primary</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="status in statuses"
                :key="'surface-' + status.label"
                :class="status.className"
                class="rounded-full px-2.5 py-1 text-caption text-content-text-primary"
              >
                {{ status.label }}
              </span>
            </div>
            <div class="mt-3 text-caption text-content-text-secondary">Badges / text-content-text-secondary</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="status in statuses"
                :key="'surface-secondary-' + status.label"
                :class="status.className"
                class="rounded-full px-2.5 py-1 text-caption text-content-text-secondary"
              >
                {{ status.label }}
              </span>
            </div>

            <div class="mt-5 rounded-lg bg-bg-surface-alt p-4">
              <div class="mb-2 text-caption text-content-text-secondary">
                Карточка внутри карточки, слой 2 (bg-surface-alt)
              </div>
              <h4 class="text-subtitle text-content-text-primary">Primary text</h4>
              <p class="mt-2 text-body-sm text-content-text-secondary">Secondary text</p>
              <a href="#" class="mt-3 inline-flex text-link text-body-sm">Link example</a>
              <div class="mt-4 text-caption text-content-text-secondary">Badges / text-content-text-primary</div>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="status in statuses"
                  :key="'nested-' + status.label"
                  :class="status.className"
                  class="rounded-full px-2.5 py-1 text-caption text-content-text-primary"
                >
                  {{ status.label }}
                </span>
              </div>
              <div class="mt-3 text-caption text-content-text-secondary">Badges / text-content-text-secondary</div>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="status in statuses"
                  :key="'nested-secondary-' + status.label"
                  :class="status.className"
                  class="rounded-full px-2.5 py-1 text-caption text-content-text-secondary"
                >
                  {{ status.label }}
                </span>
              </div>
            </div>
          </article>

          <article class="rounded-xl bg-bg-surface-alt p-5 shadow-sm">
            <div class="mb-2 text-caption text-content-text-secondary">
              Просто карточка слой 2 на странице (bg-surface-alt)
            </div>
            <h3 class="text-subtitle text-content-text-primary">Primary text</h3>
            <p class="mt-2 text-body-sm text-content-text-secondary">Secondary text</p>
            <a href="#" class="mt-3 inline-flex text-link text-body-sm">Link example</a>
            <div class="mt-4 text-caption text-content-text-secondary">Badges / text-content-text-primary</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="status in statuses"
                :key="'surface-alt-' + status.label"
                :class="status.className"
                class="rounded-full px-2.5 py-1 text-caption text-content-text-primary"
              >
                {{ status.label }}
              </span>
            </div>
            <div class="mt-3 text-caption text-content-text-secondary">Badges / text-content-text-secondary</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="status in statuses"
                :key="'surface-alt-secondary-' + status.label"
                :class="status.className"
                class="rounded-full px-2.5 py-1 text-caption text-content-text-secondary"
              >
                {{ status.label }}
              </span>
            </div>
          </article>
        </div>
      </div>
    `,
  }),
}
