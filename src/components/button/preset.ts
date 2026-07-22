import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const button: Partial<Config> = {
    plugins: [
        plugin(({ addComponents }) => {
            addComponents({
                '.ui-button': {
                    '&.slab': {
                        '&.tertiary-alt ': {
                            '.ui-button__content': {
                                backgroundColor: 'var(--component-button-tertiary-default-alt-bg)',
                                border: '2px solid var(--component-button-tertiary-default-alt-bordercolor)',
                                color: 'var(--component-button-tertiary-default-alt-fg)',
                                '&:hover': {
                                    backgroundColor: 'var(--component-button-tertiary-hover-alt-bg)',
                                    color: 'var(--component-button-tertiary-hover-alt-fg)',
                                },
                                '&:active': {
                                    backgroundColor: 'var(--component-button-tertiary-pressed-alt-bg)',
                                    color: 'var(--component-button-tertiary-pressed-alt-fg)',
                                },
                                '&:hover, &:active, &:disabled': {
                                    borderColor: 'transparent',
                                }
                            }
                        }
                    },
                    '&.icon': {
                        '&.tertiary-alt': {
                            '.ui-button__content': {
                                color: 'var(--component-button-tertiary-default-alt-fg)',
                                '&:hover': {
                                    color: 'var(--component-button-tertiary-hover-alt-fg)',
                                },
                                '&:active': {
                                    color: 'var(--component-button-tertiary-pressed-alt-fg)',
                                },
                            }
                        },
                        '&.ghost-alt': {
                            '.ui-button__content': {
                                color: 'var(--component-button-ghost-default-alt-fg)',
                                '&:hover': {
                                    color: 'var(--component-button-ghost-hover-alt-fg)',
                                },
                                '&:active': {
                                    color: 'var(--component-button-ghost-pressed-alt-fg)',
                                },
                            }
                        }
                    },
                    '&.action': {
                        '&.tertiary-alt': {
                            '.ui-button__main-icon': {
                                color: 'var(--component-button-tertiary-default-alt-fg)',
                                '&:hover': {
                                    color: 'var(--component-button-tertiary-hover-alt-fg)',
                                },
                                '&:active': {
                                    color: 'var(--component-button-tertiary-pressed-alt-fg)',
                                },
                            }
                        }
                    }
                },
            })
        }),
    ],
}

export default button
