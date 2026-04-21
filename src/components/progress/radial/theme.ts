import {tokenClass} from "../../theme-utils.ts";

type RadialProgressClassList = readonly string[]


const RADIAL_PROGRESS_BASE: RadialProgressClassList = [
  'relative',
  'flex',
  'items-center',
  'justify-center',
]

const RADIAL_PROGRESS_SVG: RadialProgressClassList = [
  'relative',
  'z-10',
  'h-full',
  'w-full',
]

const RADIAL_PROGRESS_TRAIL: RadialProgressClassList = [
  tokenClass('--component-progress-bg', 'stroke'),
]

const RADIAL_PROGRESS_LINE: RadialProgressClassList = [
  tokenClass('--component-progress-brand', 'stroke'),
]

const RADIAL_PROGRESS_CONTENT: RadialProgressClassList = [
  'absolute',
  'inset-0',
  'flex',
  'items-center',
  'justify-center',
  'rounded-full',
  tokenClass('--color-transparent', 'bg'),
]

const radialProgress = {
  base: RADIAL_PROGRESS_BASE,
  slots: {
    svg: RADIAL_PROGRESS_SVG,
    trail: RADIAL_PROGRESS_TRAIL,
    line: RADIAL_PROGRESS_LINE,
    content: RADIAL_PROGRESS_CONTENT,
  },
} as const

export type RadialProgressUiOptimized = typeof radialProgress

export default radialProgress
