import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const button: Partial<Config> = {
    plugins: [
        plugin(({ addComponents }) => {
            addComponents({
                '.ui-button': {
                    '&.primary': {
                        '.ui-button--primary': {
                            background: 'var(--component-button-primary-default-bg)',
                            color: 'var(--component-button-primary-default-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--primary': {
                            background: 'var(--component-button-primary-hover-bg)',
                            color: 'var(--component-button-primary-hover-fg)',
                        },

                        '&:not(:disabled):active .ui-button--primary, &[aria-busy="true"] .ui-button--primary': {
                            background: 'var(--component-button-primary-pressed-bg)',
                            color: 'var(--component-button-primary-pressed-fg)',
                        },
                    },

                    '&.destructive': {
                        '.ui-button--destructive': {
                            background: 'var(--component-button-destructive-default-bg)',
                            color: 'var(--component-button-destructive-default-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--destructive': {
                            background: 'var(--component-button-destructive-hover-bg)',
                            color: 'var(--component-button-destructive-hover-fg)',
                        },

                        '&:not(:disabled):active .ui-button--destructive, &[aria-busy="true"] .ui-button--destructive': {
                            background: 'var(--component-button-destructive-pressed-bg)',
                            color: 'var(--component-button-destructive-pressed-fg)',
                        },
                    },

                    '&.secondary': {
                        '.ui-button--secondary': {
                            borderWidth: '2px',
                            borderColor: 'var(--component-button-secondary-default-bordercolor)',
                            background: 'var(--component-button-secondary-default-bg)',
                            color: 'var(--component-button-secondary-default-fg)',
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
                    },

                    '&.tertiary': {
                        '.ui-button--tertiary': {
                            background: 'var(--component-button-tertiary-default-bg)',
                            color: 'var(--component-button-tertiary-default-fg)',
                        },

                        '&:not(:disabled):hover .ui-button--tertiary': {
                            background: 'var(--component-button-tertiary-hover-bg)',
                            color: 'var(--component-button-tertiary-hover-fg)',
                        },

                        '&:not(:disabled):active .ui-button--tertiary, &[aria-busy="true"] .ui-button--tertiary': {
                            background: 'var(--component-button-tertiary-pressed-bg)',
                            color: 'var(--component-button-tertiary-pressed-fg)',
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
                    },

                    '&:disabled:not([aria-busy="true"])': {
                        '&.primary, &.destructive': {
                            opacity: '0.25'
                        },
                        '&.secondary, &.tertiary, &.ghost': {
                            opacity: '0.45'
                        }
                    },
                    '&[aria-busy="true"]:not(.slab)': {
                        '.ui-button__main-icon': {
                            opacity: '0'
                        }
                    },

                    '.ui-button__loading-overlay': {
                        '@apply absolute inset-0': {},
                        background: 'var(--component-button-tint)',
                    },
                    '.ui-button__loading-icon': {
                        '@apply size-32': {}
                    },

                    '&.slab': {
                        '&.tertiary-alt': {
                            '.ui-button--tertiary': {
                                background: 'var(--component-button-tertiary-default-alt-bg)',
                                border: '2px solid var(--component-button-tertiary-default-alt-bordercolor)',
                                color: 'var(--component-button-tertiary-default-alt-fg)',
                            },
                            '&:not(:disabled):hover .ui-button--tertiary': {
                                background: 'var(--component-button-tertiary-hover-alt-bg)',
                                borderColor: 'transparent',
                                color: 'var(--component-button-tertiary-hover-alt-fg)',
                            },
                            '&:not(:disabled):active .ui-button--tertiary, &[aria-busy="true"] .ui-button--tertiary': {
                                background: 'var(--component-button-tertiary-pressed-alt-bg)',
                                borderColor: 'transparent',
                                color: 'var(--component-button-tertiary-pressed-alt-fg)',
                            }
                        }
                    },
                    '&.icon': {
                        '&.tertiary-alt': {
                            '.ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-default-alt-fg)',
                            },
                            '&:not(:disabled):hover .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-hover-alt-fg)',
                            },
                            '&:not(:disabled):active .ui-button--tertiary, &[aria-busy="true"] .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-pressed-alt-fg)',
                            }
                        },
                        '&.ghost-alt': {
                            '.ui-button--ghost': {
                                color: 'var(--component-button-ghost-default-alt-fg)',
                            },
                            '&:not(:disabled):hover .ui-button--ghost': {
                                color: 'var(--component-button-ghost-hover-alt-fg)',
                            },
                            '&:not(:disabled):active .ui-button--ghost, &[aria-busy="true"] .ui-button--ghost': {
                                color: 'var(--component-button-ghost-pressed-alt-fg)',
                            }
                        }
                    },
                    '&.action': {
                        '&.tertiary-alt': {
                            '.ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-default-alt-fg)',
                            },
                            '&:not(:disabled):hover .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-hover-alt-fg)',
                            },
                            '&:not(:disabled):active .ui-button--tertiary, &[aria-busy="true"] .ui-button--tertiary': {
                                color: 'var(--component-button-tertiary-pressed-alt-fg)',
                            }
                        }
                    }
                },
            })
        }),
    ],
}

export default button
