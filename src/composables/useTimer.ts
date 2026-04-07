import dayjs, { type Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Ref,
} from 'vue'
import { formatTimerText } from '../helpers/formatTimerText'
import type { TimerPhase, UiTimerConfig, UiTimerLabels } from '../components/timer/types'

dayjs.extend(duration)
dayjs.extend(utc)

const DEFAULT_LABELS: Required<UiTimerLabels> = {
  d: 'd',
  h: 'h',
  m: 'm',
  s: 's',
}

type UseTimerOptions = {
  config: Ref<UiTimerConfig>
  labels?: UiTimerLabels
}

type ResolvedPhase = {
  label: string
  phase: TimerPhase
  target: Dayjs | null
}

export function useTimer(options: UseTimerOptions) {
  const currentTime = ref(dayjs.utc())
  let intervalId: number | null = null

  const resolvedLabels = computed<Required<UiTimerLabels>>(() => ({
    ...DEFAULT_LABELS,
    ...options.labels,
  }))

  const timeline = computed(() => {
    const startAt = options.config.value.startAt?.value?.utc()
    const finishAt = options.config.value.finishAt.value.utc()

    return {
      startAt: startAt?.isValid() ? startAt : null,
      finishAt: finishAt.isValid() ? finishAt : null,
    }
  })

  const currentPhase = computed<ResolvedPhase>(() => {
    const { startAt, finishAt } = timeline.value
    const now = currentTime.value
    const isOver = !finishAt || now.isSame(finishAt) || now.isAfter(finishAt)
    const isBeforeStart = Boolean(startAt && now.isBefore(startAt))

    if (isOver) {
      return {
        label: options.config.value.expired.label,
        phase: 'over',
        target: null,
      }
    }

    if (isBeforeStart && startAt) {
      return {
        label: options.config.value.startAt?.label ?? '',
        phase: 'start',
        target: startAt,
      }
    }

    return {
      label: options.config.value.finishAt.label,
      phase: 'finish',
      target: finishAt,
    }
  })

  const remainingMs = computed(() => {
    const target = currentPhase.value.target

    if (!target) {
      return 0
    }

    return Math.max(0, target.diff(currentTime.value, 'millisecond'))
  })

  const remainingDuration = computed(() => dayjs.duration(remainingMs.value))
  const resolvedState = computed<TimerPhase>(() => currentPhase.value.phase)
  const isExpired = computed(() => resolvedState.value === 'over')
  const leadingLabel = computed(() => {
    if (isExpired.value) {
      return ''
    }

    return currentPhase.value.label
  })

  const timerText = computed(() => {
    if (isExpired.value) {
      return options.config.value.expired.label
    }

    return formatTimerText(remainingDuration.value, resolvedLabels.value)
  })

  function syncRemainingTime() {
    currentTime.value = dayjs.utc()
  }

  function startTicker() {
    syncRemainingTime()

    if (intervalId !== null) {
      globalThis.clearInterval(intervalId)
    }

    intervalId = globalThis.setInterval(syncRemainingTime, 1000)
  }

  function stopTicker() {
    if (intervalId !== null) {
      globalThis.clearInterval(intervalId)
      intervalId = null
    }
  }

  watch(() => options.config.value, syncRemainingTime, { immediate: true, deep: true })

  onMounted(() => {
    startTicker()
  })

  onBeforeUnmount(() => {
    stopTicker()
  })

  return {
    isExpired,
    leadingLabel,
    resolvedState,
    timerText,
  }
}
