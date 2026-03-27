import type { RouteLocationRaw } from 'vue-router'

export const LINK_SiZES = ['default', 'body-sm', 'caption'] as const;

export type LinkSize = (typeof LINK_SiZES)[number];

export interface UiLinkProps {
    to?: RouteLocationRaw
    size: LinkSize
    activeClass?: string
    exactActiveClass?: string
}


export interface UiLinkEmits {
    (event: 'click', value: MouseEvent): void
}

export interface UiLinkSlots {
    default: () => unknown
}
