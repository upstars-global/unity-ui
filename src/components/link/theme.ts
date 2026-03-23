import type {LinkSize} from "./types.ts";

const link = {
  base: 'ui-link text-link',
  size: {
    'default': 'text-body',
    'body-sm': 'text-body-sm',
    'caption': 'text-caption',
  } satisfies Record<LinkSize, string>
} as const

export type LinkUiOptimized = typeof link

export default link
