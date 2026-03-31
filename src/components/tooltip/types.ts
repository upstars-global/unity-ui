import type { AlignedPlacement, Placement, Side, Strategy } from '@floating-ui/vue'

export interface UiTooltipProps {
  text?: string
  placement?: AlignedPlacement | Side
  strategy?: Strategy
  fallbackPlacements?: Placement[]
  offsetValue?: number
  disabled?: boolean
  trigger?: 'hover' | 'click' | 'always'
}
