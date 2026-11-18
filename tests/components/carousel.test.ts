import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { describe, expect, it } from 'vitest'
import UiCarousel from '../../src/components/carousel/UiCarousel.vue'

function renderCarousel(allowChildrenMismatch: boolean) {
  const app = createSSRApp({
    render: () => h(
      UiCarousel,
      {
        allowChildrenMismatch,
        showNavigation: false,
      },
      {
        default: () => [
          h('article', { class: 'carousel-card' }, 'Card'),
        ],
      },
    ),
  })

  return renderToString(app)
}

describe('UiCarousel hydration mismatch allowance', () => {
  it('allows children and class mismatches when enabled', async () => {
    const html = await renderCarousel(true)

    expect(html).toContain('data-allow-mismatch="children,class"')
    expect(html).toMatch(/<article[^>]*data-allow-mismatch="class"/)
  })

  it('does not render mismatch allowances by default', async () => {
    const html = await renderCarousel(false)

    expect(html).not.toContain('data-allow-mismatch')
  })
})
