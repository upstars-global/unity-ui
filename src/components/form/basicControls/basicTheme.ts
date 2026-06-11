import {tokenClass} from "../../theme-utils.ts";

export const DEFAULT_SIZE = {
    field: [
        tokenClass('--radius-input-default', 'rounded'),
        tokenClass('--component-input-height-default', 'h'),
        tokenClass('--spacing-8', 'py'),
        tokenClass('--spacing-12', 'px'),
    ],
};
export const SM_SIZE = {
    field: [
        tokenClass('--radius-input-sm', 'rounded'),
        tokenClass('--component-input-height-sm', 'h'),
        tokenClass('--component-input-padding-sm', 'p'),
    ],
};


export const INPUT_BASE = [
    'ui-input',
    'group',
    'flex',
    'flex-col',
    'relative',
    tokenClass('--component-input-gap', 'gap'),
    tokenClass('--component-input-disabled-opacity', 'data-[disabled=true]:opacity'),
]

export const FIELD_BASE = [
    'flex',
    'items-center',
    'w-full',
    'overflow-hidden',
    'border-solid',
    '[border:var(--component-input-borderwidth)_solid_var(--component-input-bordercolor)]',
    tokenClass('--component-input-field-gap', 'gap'),
    tokenClass('--component-input-bg', 'bg'),
    tokenClass('--component-input-hover-bordercolor', 'hover:[&:not(:focus-within):not([data-invalid=true]):not([data-disabled=true])]:border'),
    tokenClass('--component-input-focus-bordercolor', 'focus-within:border'),
    tokenClass('--component-input-error-bordercolor', 'data-[invalid=true]:[&:not(:focus-within)]:border'),
]

export const TEXT_BASE = ['min-w-0', 'truncate']

export const LABEL_BASE = [
    'left-0 origin-left transition-all duration-200 ease-out cursor-text',
    'text-body',
    'font-medium',
    'duration-150',
    tokenClass('--component-input-label', 'text'),
    'group-data-[invalid=true]:text-[var(--component-input-error-label)]',
    'group-focus-within:!text-[var(--component-input-focus-label)]',
]

export const MESSAGE_BASE = [
    tokenClass('--component-input-message-padding-x', 'px'),
    tokenClass('--component-input-message', 'text'),
    tokenClass('--component-input-error-message', 'group-data-[invalid=true]:text'),
    'group-focus-within:!text-[var(--component-input-message)]',
    'text-caption',
]


export const ERROR_MESSAGE_BASE = [
    'flex',
    tokenClass('--spacing-4', 'gap'),
    tokenClass('--component-input-error-message', 'group-data-[invalid=true]:text'),
    'group-focus-within:text-[var(--component-input-message)]',
]
