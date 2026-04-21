export const RADIAL_PROGRESS_START_POSITIONS = [
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
  'top-left',
] as const

export type UiRadialProgressStartPosition = (typeof RADIAL_PROGRESS_START_POSITIONS)[number]

export const RADIAL_PROGRESS_START_ANGLE_MAP: Record<UiRadialProgressStartPosition, number> = {
  top: -90,
  'top-right': -45,
  right: 0,
  'bottom-right': 45,
  bottom: 90,
  'bottom-left': 135,
  left: 180,
  'top-left': 225,
}

export interface UiRadialProgressProps {
  progress: number
  progressWidth: number
  max?: number
  size?: number
  startAngle?: UiRadialProgressStartPosition
  gap?: number
  isAnimation?: boolean
  rounded?: boolean
}
