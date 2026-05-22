import type { ModalSize } from './types'
import {tokenClass} from "../theme-utils.ts";

type ModalClassList = readonly string[]
type ModalSizeMap = Record<ModalSize, ModalClassList>

const MODAL_BASE = [
    'w-full h-full',
    'fixed',
    'top-0 left-0 top-0 bottom-0',
    'bg-neutral-50',
    'z-index-100',
    'cursor-pointer',
    tokenClass('--bg-overlay', 'bg'),
]


const MODAL_CONTAINER = [
    'flex items-center justify-center',
    'max-h-80dvh',
    'min-w-[20rem]',
    'max-w-100dvw',
    'md:w-full',
    tokenClass('--spacing-16', 'p'),
    tokenClass('--radius-modal', 'rounded-t'),
    tokenClass('--radius-modal', 'md:rounded'),
    tokenClass('--component-modal-bg', 'bg'),
]

const MODAL_CONTENT = [
    'max-w-full',
    'w-full',
    'box-border',
    'flex flex-col gap-6',
    'overflow-hidden',
    'pb-safe',
    tokenClass('--spacing-24', 'gap'),
]
const MODAL_HEADER = [
    'flex justify-space-between items-center w-full',
    'text-subtitle',
    tokenClass('--spacing-8', 'gap'),
    tokenClass('--component-modal-fg-primary', 'text'),
]
const MODAL_HEADER_ICONS = [
    'w-6 h-6'
]
const MODAL_HEADER_TITLE = [
    'shrink grow basis-auto text-center',
]
const MODAL_BOTTOM_ACTIONS = [
    'flex w-full',
    'justify-center items-center',
    tokenClass('--spacing-16', 'gap'),
]

const MODAL_SIZES = {
    s: ['md:w-[calc(100dvw-2rem)] md:max-w-[27rem]'],
    m: ['md:w-[calc(100dvw-2rem)] md:max-w-[40rem]'],
    l: ['md:w-[calc(100dvw-2rem)] md:max-w-[52.5rem]'],
    xl: ['md:w-[calc(100dvw-2rem)] md:max-w-[67.5rem]'],

} satisfies ModalSizeMap

const modal = {
    base: MODAL_BASE,
    slots: {
        modalContainer: MODAL_CONTAINER,
        modalContent: MODAL_CONTENT,
        modalHeader: MODAL_HEADER,
        modalHeaderIcons: MODAL_HEADER_ICONS,
        modalHeaderTitle: MODAL_HEADER_TITLE,
        modalBottomActions: MODAL_BOTTOM_ACTIONS,
    },
    sizes: {
        ...MODAL_SIZES,
        fullScreen: ['h-full max-w-full', '!rounded-0', '!justify-start']
    },
} as const

export type ModalUiOptimized = typeof modal

export default modal
