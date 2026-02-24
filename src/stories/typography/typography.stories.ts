import type { Meta, StoryObj } from '@storybook/vue3-vite'

type Args = {
    text: string
    useUppercase: boolean
}

const meta = {
    title: 'Foundation/Typography',
    tags: ['autodocs'],
    args: {
        text: 'The quick brown fox jumps over the lazy dog 123',
        useUppercase: false,
    },
    argTypes: {
        text: { control: 'text' },
        useUppercase: { control: 'boolean' },
    },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

const rows: Array<{ label: string; className: string; note?: string }> = [
    { label: 'Title / Display', className: 'text-title-display' },
    { label: 'Title / LG', className: 'text-title-lg' },
    { label: 'Title / MD', className: 'text-title-md' },
    { label: 'Title / SM', className: 'text-title-sm' },

    { label: 'Subtitle', className: 'text-subtitle' },

    { label: 'Body', className: 'text-body' },
    { label: 'Body / SM', className: 'text-body-sm' },

    { label: 'Caption', className: 'text-caption' },
    { label: 'Tiny', className: 'text-tiny' },

    { label: 'Button / XL', className: 'text-button-xl' },
    { label: 'Button / LG', className: 'text-button-lg' },
    { label: 'Button / MD', className: 'text-button-md' },
    { label: 'Button / SM', className: 'text-button-sm' },
    { label: 'Button / XS', className: 'text-button-xs' },
    { label: 'Button / Caption', className: 'text-button-caption' },

    { label: 'Link (base class)', className: 'text-link', note: 'Uses .text-link from @layer base' },
]

export const Overview: Story = {
    render: (args) => ({
        setup() {
            return { args, rows }
        },
        template: `
      <div class="p-6 space-y-8">
        <!-- Optional: show tag mapping demo (h1..h4 are styled via @layer base) -->
        <div class="space-y-3">
          <div class="text-body-sm opacity-70">HTML tags (styled via @layer base)</div>
          <h1 :class="{ uppercase: args.useUppercase }">{{ args.text }}</h1>
          <h2 :class="{ uppercase: args.useUppercase }">{{ args.text }}</h2>
          <h3 :class="{ uppercase: args.useUppercase }">{{ args.text }}</h3>
          <h4 :class="{ uppercase: args.useUppercase }">{{ args.text }}</h4>
          <div class="text-body" :class="{ uppercase: args.useUppercase }">{{ args.text }}</div>
          <a href="#" :class="{ uppercase: args.useUppercase }">{{ args.text }}</a>
        </div>

        <!-- Tokens -->
        <div class="space-y-4">
          <div class="text-body-sm opacity-70">Tokens / Utilities</div>

          <div
            v-for="row in rows"
            :key="row.className"
            class="rounded-md border border-[rgb(var(--neutral-200))] p-4"
          >
            <div class="flex items-baseline justify-between gap-4">
              <div class="text-body-sm opacity-70">
                {{ row.label }}
                <span class="opacity-60"> — {{ row.className }}</span>
              </div>
              <div v-if="row.note" class="text-body-sm opacity-60">{{ row.note }}</div>
            </div>

            <div class="mt-2 break-words" :class="[row.className, { uppercase: args.useUppercase }]">
              {{ args.text }}
            </div>
          </div>
        </div>
      </div>
    `,
    }),
}
