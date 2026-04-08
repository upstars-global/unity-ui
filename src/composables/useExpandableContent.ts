import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  type CSSProperties,
  type Ref,
} from 'vue'

type ExpandableStyleProperty = 'height' | 'maxHeight'

interface UseExpandableContentOptions {
  collapsedHeight?: number
  initialOpen?: boolean
  isServer?: boolean
  styleProperty?: ExpandableStyleProperty
}

interface UseExpandableContentResult {
  contentWrapper: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  contentHeight: Ref<number>
  contentStyle: Readonly<Ref<CSSProperties>>
  isOpen: Ref<boolean>
  setOpen: (value: boolean) => void
  toggleContent: () => void
  updateContentHeight: () => void
}

export function useExpandableContent(
  options: UseExpandableContentOptions = {}
): UseExpandableContentResult {
  const contentWrapper = ref<HTMLElement | null>(null)
  const content = ref<HTMLElement | null>(null)
  const contentHeight = ref(0)
  const isOpen = ref(options.initialOpen || false)
  const resizeObserver = ref<ResizeObserver | null>(null)

  const styleProperty = options.styleProperty ?? 'maxHeight'

  function updateContentHeight() {
    contentHeight.value = content.value?.scrollHeight ?? 0
  }

  const contentStyle = computed<CSSProperties>(() => {
    const collapsedHeight = options.collapsedHeight ?? 0
    const height = isOpen.value ? contentHeight.value : collapsedHeight
    return {
      [styleProperty]: `${height}px`,
    } as CSSProperties
  })

  const toggleContent = () => {
    isOpen.value = !isOpen.value

    void nextTick().then(() => {
      updateContentHeight()
    })
  }

  const setOpen = (value: boolean) => {
    isOpen.value = value

    void nextTick().then(() => {
      updateContentHeight()
    })
  }

  onMounted(async () => {
    if (options.isServer) {
      return
    }

    await nextTick()
    updateContentHeight()

    if (!content.value) {
      return
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver.value = new ResizeObserver(() => {
        updateContentHeight()
      })

      resizeObserver.value.observe(content.value)
    }
  })

  onBeforeUnmount(() => {
    resizeObserver.value?.disconnect()
  })

  return {
    content,
    contentWrapper,
    contentHeight,
    contentStyle,
    isOpen,
    setOpen,
    toggleContent,
    updateContentHeight,
  }
}
