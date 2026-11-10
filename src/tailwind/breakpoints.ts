export const BREAKPOINTS = {
  xxs: 320,
  xs: 352,
  sm: 544,
  md: 752,
  lg: 1088,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1664,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

