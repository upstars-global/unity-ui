import type { Placement, Strategy } from '@floating-ui/vue'

export type UiTooltipPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export const TOOLTIP_PLACEMENT_MAP = {
  'top-left': 'top-start',
  'top-center': 'top',
  'top-right': 'top-end',
  'bottom-left': 'bottom-start',
  'bottom-center': 'bottom',
  'bottom-right': 'bottom-end',
} satisfies Record<UiTooltipPlacement, Placement>

export interface UiTooltipProps {
  text?: string
  placement?: UiTooltipPlacement
  strategy?: Strategy
  fallbackPlacements?: UiTooltipPlacement[]
  offsetValue?: number
  disabled?: boolean
  trigger?: 'hover' | 'click' | 'always'
}
