import { tokenClass } from '../theme-utils'
import type { BadgeVariant } from './types'

type BadgeClassList = readonly string[]
type BadgeSizeConfig = {
    container: BadgeClassList
    label: BadgeClassList
}

const BADGE_BASE: BadgeClassList = [
    'inline-flex',
    'items-center',
    'justify-center',
    'overflow-hidden',
    'shrink-0',
    'upper-case',
]
const BADGE_LABEL_BASE: BadgeClassList = [
    'text-caption',
    'font-bold',
    'uppercase',
    'whitespace-nowrap',
]

function buildTone(backgroundToken: string, foregroundToken: string): BadgeClassList {
    return [
        tokenClass(backgroundToken, 'bg'),
        tokenClass(foregroundToken, 'text'),
    ]
}

const badge = {
    base: BADGE_BASE,
    size: {
        default: {
            container: [
                'h-24',
                tokenClass('--radius-badge', 'rounded'),
                tokenClass('--spacing-8', 'p'),
            ],
            label: BADGE_LABEL_BASE,
        } satisfies BadgeSizeConfig,
    },
    variant: {
        'status-error': buildTone('--component-badge-status-bg-error', '--component-badge-status-fg'),
        'status-warning': buildTone('--component-badge-status-bg-warning', '--component-badge-status-fg'),
        'status-success': buildTone('--component-badge-status-bg-success', '--component-badge-status-fg'),
        'navigation-default': buildTone('--component-badge-navigation-bg-default', '--component-badge-navigation-fg'),
        'navigation-new': buildTone('--component-badge-navigation-bg-new', '--component-badge-navigation-fg'),
        'neutral': buildTone('--component-badge-neutral-bg', '--component-badge-neutral-fg'),
        'personal': [
            'bg-gradient-personal',
            tokenClass('--component-badge-personal-fg', 'text')
        ],
    } satisfies Record<BadgeVariant, BadgeClassList>,
    slots: {
        label: BADGE_LABEL_BASE,
    },
} as const

export type BadgeUiOptimized = typeof badge

export default badge
