import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const button: Partial<Config> = {
    plugins: [
        plugin(({ addComponents }) => {
            addComponents({
                '.ui-switcher': {
                    '&__track': {
                        backgroundColor: 'var(--component-control-default)',
                    },
                    '&__thumb': {
                        backgroundColor: 'var(--component-control-default)',
                        left: '0%'
                    },
                    '&.selected .ui-switcher__track': {
                        backgroundColor: 'var(--component-control-selected)',
                    },
                    '&.selected .ui-switcher__thumb': {
                        backgroundColor: 'var(--component-control-selected)',
                        right: '0%',
                        left: 'auto',
                    },
                    '&[data-invalid="true"] .ui-switcher__track, &[data-invalid="true"] .ui-switcher__thumb': {
                        backgroundColor: 'var(--component-control-error)',
                    },
                    '&[data-disabled="true"] .ui-switcher__label': {
                        opacity: '0.45',
                    },
                },
            })
        }),
    ],
}

export default button
