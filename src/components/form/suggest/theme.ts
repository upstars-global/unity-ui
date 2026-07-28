import {tokenClass} from "../../theme-utils.ts";

const SUGGEST_BASE = [
  'flex flex-col max-h-[20rem] overflow-y-auto overflow-x-hidden',
]

const SUGGEST_FLOATING = [
  'absolute top-full left-0 right-0 mt-8',
]

const SUGGEST_PANEL = [
  tokenClass('--component-input-list-bg', 'bg'),
  tokenClass('--radius-list', 'rounded'),
  tokenClass('--spacing-4', 'gap'),
  tokenClass('--spacing-4', 'p'),
]

const SUGGEST_EMBEDDED = [
  tokenClass('--spacing-4', 'gap'),
  tokenClass('--spacing-4', 'p'),
]

const SUGGEST_ITEM = [
  'flex shrink-0 grow-0 items-center cursor-pointer',
  'h-[3rem]',
  tokenClass('--spacing-8', 'gap'),
  tokenClass('--spacing-8', 'py'),
  tokenClass('--spacing-12', 'px'),
  tokenClass('--radius-list', 'rounded'),
  tokenClass('--component-input-list-hover', 'hover:bg'),
  tokenClass('--component-input-list-hover', 'aria-selected:bg'),
  tokenClass('--component-input-list-hover', 'data-[active=true]:bg'),
  tokenClass('--component-input-list-suggest-text-default', 'text'),
  'text-body font-medium text-nowrap ',
]
const SUGGEST_ICON = [
  tokenClass('--component-input-list-icon', 'text'),
]
const SUGGEST_EMPTY = [
  tokenClass('--component-input-list-suggest-text-default', 'text'),
  'text-body',
  'font-medium',
]
const suggest = {
  base: SUGGEST_BASE,
  slots: {
    floating: SUGGEST_FLOATING,
    panel: SUGGEST_PANEL,
    embedded: SUGGEST_EMBEDDED,
    item: SUGGEST_ITEM,
    icon: SUGGEST_ICON,
    empty: SUGGEST_EMPTY,
  },
} as const

export type SuggestUiOptimized = typeof suggest

export default suggest
