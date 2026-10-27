import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const button: Partial<Config> = {
    plugins: [
        plugin(({ addComponents }) => {
            addComponents({
                '.ui-button': {
                    '&.standard .ui-button__content, &.caption .ui-button__content, &.slab .ui-button__content': {
                        minWidth: 'var(--component-button-minwidth-default)',
                    },
                    '&.primary': {
                        '.ui-button--primary': {
                            background: 'var(--component-button-primary-default-bg)',
                            color: 'var(--component-button-primary-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--primary': {
                            background: 'var(--component-button-primary-hover-bg)',
                            color: 'var(--component-button-primary-fg)',
                        },

                        '&:not(:disabled):active .ui-button--primary, &[aria-busy="true"] .ui-button--primary': {
                            background: 'var(--component-button-primary-pressed-bg)',
                            color: 'var(--component-button-primary-pressed-fg)',
                        },
                        '.ui-button__loading-overlay': {
                            background: 'var(--component-button-primary-loading-bg)',
                        },
                        '&.action[aria-busy="true"] .ui-button__main-icon-wrapper': {
                            background: 'var(--component-button-primary-loading-bg)',
                        },
                        '.ui-button__loading-icon': {
                            color: 'var(--component-button-primary-loading-fg)',
                        },
                    },

                    '&.destructive': {
                        '.ui-button--destructive': {
                            background: 'var(--component-button-destructive-default-bg)',
                            color: 'var(--component-button-destructive-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--destructive': {
                            background: 'var(--component-button-destructive-hover-bg)',
                            color: 'var(--component-button-destructive-fg)',
                        },

                        '&:not(:disabled):active .ui-button--destructive, &[aria-busy="true"] .ui-button--destructive': {
                            background: 'var(--component-button-destructive-pressed-bg)',
                            color: 'var(--component-button-destructive-fg)',
                        },

                        '.ui-button__loading-overlay': {
                            background: 'var(--component-button-destructive-loading-bg)',
                        },
                        '&.action[aria-busy="true"] .ui-button__main-icon-wrapper': {
                            background: 'var(--component-button-destructive-loading-bg)',
                        },
                        '.ui-button__loading-icon': {
                            color: 'var(--component-button-destructive-loading-fg)',
                        },
                    },

                    '&.secondary': {
                        '.ui-button--secondary': {
                            borderWidth: 'var(--component-button-borderwidth-outline)',
                            borderColor: 'var(--component-button-secondary-default-bordercolor)',
                            background: 'var(--component-button-secondary-default-bg)',
                            color: 'var(--component-button-secondary-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--secondary': {
                            borderColor: 'var(--component-button-secondary-hover-bordercolor)',
                            background: 'var(--component-button-secondary-hover-bg)',
                            color: 'var(--component-button-secondary-hover-fg)',
                        },

                        '&:not(:disabled):active .ui-button--secondary, &[aria-busy="true"] .ui-button--secondary': {
                            borderColor: 'var(--component-button-secondary-pressed-bordercolor)',
                            background: 'var(--component-button-secondary-pressed-bg)',
                            color: 'var(--component-button-secondary-pressed-fg)',
                        },
                        '.ui-button__loading-overlay': {
                            background: 'var(--component-button-secondary-loading-bg)',
                            border: 'var(--component-button-borderwidth-outline) solid var(--component-button-secondary-loading-bordercolor)',
                        },
                        '&.action[aria-busy="true"] .ui-button__main-icon-wrapper': {
                            background: 'var(--component-button-secondary-loading-bg)',
                            borderColor: 'var(--component-button-secondary-loading-bordercolor)',
                        },
                        '.ui-button__loading-icon': {
                            color: 'var(--component-button-secondary-loading-fg)',
                        },
                    },

                    '&.tertiary': {
                        '.ui-button--tertiary': {
                            border: 'var(--component-button-borderwidth-outline) solid var(--component-button-tertiary-default-bordercolor)',
                            background: 'var(--component-button-tertiary-default-bg)',
                            color: 'var(--component-button-tertiary-default-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--tertiary': {
                            borderColor: 'var(--component-button-tertiary-hover-bordercolor)',
                            background: 'var(--component-button-tertiary-hover-bg)',
                            color: 'var(--component-button-tertiary-hover-fg)',
                        },

                        '&:not(:disabled):active .ui-button--tertiary': {
                            borderColor: 'var(--component-button-tertiary-pressed-bordercolor)',
                            background: 'var(--component-button-tertiary-pressed-bg)',
                            color: 'var(--component-button-tertiary-pressed-fg)',
                        },
                        '&[aria-busy="true"] .ui-button--tertiary': {
                            borderColor: 'var(--component-button-tertiary-loading-bordercolor)',
                            background: 'var(--component-button-tertiary-loading-bg)',
                            color: 'var(--component-button-tertiary-loading-fg)',
                        },
                        '.ui-button__loading-overlay': {
                            border: 'var(--component-button-borderwidth-outline) solid var(--component-button-tertiary-loading-bordercolor)',
                            background: 'var(--component-button-tertiary-loading-bg)',
                        },
                        '&.action[aria-busy="true"] .ui-button__main-icon-wrapper': {
                            background: 'var(--component-button-tertiary-loading-bg)',
                        },
                        '.ui-button__loading-icon': {
                            color: 'var(--component-button-tertiary-loading-fg)',
                        },
                        '&.tertiary-alt .ui-button__loading-icon': {
                            color: 'var(--component-button-tertiary-loading-alt-fg)',
                        },
                        '&.slab.tertiary-alt .ui-button__loading-overlay': {
                            background: 'var(--component-button-tertiary-loading-alt-bg)',
                            border: 'var(--component-button-borderwidth-outline) solid var(--component-button-tertiary-loading-alt-bordercolor)',
                            backdropFilter: 'blur(calc(var(--effect-blur-default) / 2))',
                        },
                    },

                    '&.ghost': {
                        '.ui-button--ghost': {
                            background: 'var(--component-button-ghost-default-bg)',
                            color: 'var(--component-button-ghost-default-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--ghost': {
                            background: 'var(--component-button-ghost-hover-bg)',
                            color: 'var(--component-button-ghost-hover-fg)',
                        },

                        '&:not(:disabled):active .ui-button--ghost, &[aria-busy="true"] .ui-button--ghost': {
                            background: 'var(--component-button-ghost-pressed-bg)',
                            color: 'var(--component-button-ghost-pressed-fg)',
                        },
                        '.ui-button__loading-overlay': {
                            background: 'var(--component-button-ghost-loading-bg)',
                        },
                        '&.action[aria-busy="true"] .ui-button__main-icon-wrapper': {
                            background: 'var(--component-button-ghost-loading-bg)',
                        },
                        '.ui-button__loading-icon': {
                            color: 'var(--component-button-ghost-loading-fg)',
                        },
                    },

                    '&:disabled:not([aria-busy="true"])': {
                        '&.primary, &.destructive': {
                            opacity: '0.25'
                        },
                        '&.secondary, &.tertiary, &.ghost': {
                            opacity: '0.45'
                        }
                    },
                    '&[aria-busy="true"]:not(.action)': {
                        '.ui-button__content': {
                            opacity: '0'
                        }
                    },

                    '.ui-button__loading-overlay': {
                        '@apply absolute inset-0': {},
                    },
                    '&.slab': {
                        '&.tertiary-alt': {
                            '.ui-button--tertiary': {
                                background: 'var(--component-button-tertiary-default-alt-bg)',
                                border: 'var(--component-button-borderwidth-outline) solid var(--component-button-tertiary-default-alt-bordercolor)',
                                color: 'var(--component-button-tertiary-fg-alt)',
                                backdropFilter: 'blur(calc(var(--effect-blur-default) / 2))',
                            },
                            '&:not(:disabled):hover .ui-button--tertiary': {
                                background: 'var(--component-button-tertiary-hover-alt-bg)',
                                borderColor: 'var(--component-button-tertiary-hover-alt-bordercolor)',
                                color: 'var(--component-button-tertiary-hover-alt-fg)',
                            },
                            '&:not(:disabled):active .ui-button--tertiary': {
                                background: 'var(--component-button-tertiary-pressed-alt-bg)',
                                borderColor: 'var(--component-button-tertiary-pressed-alt-bordercolor)',
                                color: 'var(--component-button-tertiary-pressed-alt-fg)',
                            },
                            '&[aria-busy="true"] .ui-button--tertiary': {
                                background: 'var(--component-button-tertiary-loading-alt-bg)',
                                borderColor: 'var(--component-button-tertiary-loading-alt-bordercolor)',
                                color: 'var(--component-button-tertiary-loading-alt-fg)',
                            }
                        }
                    },
                    '&.icon': {
                        '&.tertiary-alt': {
                            '.ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-fg-alt)',
                            },
                            '&:not(:disabled):hover .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-hover-alt-fg)',
                            },
                            '&:not(:disabled):active .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-pressed-alt-fg)',
                            },
                            '&[aria-busy="true"] .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-loading-alt-fg)',
                            }
                        },
                    },
                    '&.action': {
                        '&.tertiary-alt': {
                            '.ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-fg-alt)',
                            },
                            '&:not(:disabled):hover .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-hover-alt-fg)',
                            },
                            '&:not(:disabled):active .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-pressed-alt-fg)',
                            },
                            '&[aria-busy="true"] .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-loading-alt-fg)',
                            }
                        }
                    }
                },
            })
        }),
    ],
}

export default button
