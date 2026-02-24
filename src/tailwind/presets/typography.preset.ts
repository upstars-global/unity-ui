import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const typographyFontSize: NonNullable<Config['theme']>['fontSize'] = {
    'title-display': [
        'var(--text-title-display-fontsize)',
        {
            lineHeight: 'var(--text-title-display-lineheight)',
            letterSpacing: 'var(--text-title-display-letterspacing)',
            fontWeight: 'var(--text-title-fontweight)',
        },
    ],
    'title-lg': [
        'var(--text-title-lg-fontsize)',
        {
            lineHeight: 'var(--text-title-lg-lineheight)',
            letterSpacing: 'var(--text-title-lg-letterspacing)',
            fontWeight: 'var(--text-title-fontweight)',
        },
    ],
    'title-md': [
        'var(--text-title-md-fontsize)',
        {
            lineHeight: 'var(--text-title-md-lineheight)',
            letterSpacing: 'var(--text-title-md-letterspacing)',
            fontWeight: 'var(--text-title-fontweight)',
        },
    ],
    'title-sm': [
        'var(--text-title-sm-fontsize)',
        {
            lineHeight: 'var(--text-title-sm-lineheight)',
            letterSpacing: 'var(--text-title-sm-letterspacing)',
            fontWeight: 'var(--text-title-fontweight)',
        },
    ],
    'subtitle': [
        'var(--text-subtitle-fontsize)',
        {
            lineHeight: 'var(--text-subtitle-lineheight)',
            letterSpacing: 'var(--text-subtitle-letterspacing)',
            fontWeight: 'var(--text-subtitle-fontweight)',
        },
    ],
    'body': [
        'var(--text-body-fontsize)',
        {
            lineHeight: 'var(--text-body-lineheight)',
            letterSpacing: 'var(--text-body-letterspacing)',
            fontWeight: 'var(--text-fontweight-normal)',
        },
    ],
    'body-sm': [
        'var(--text-body-sm-fontsize)',
        {
            lineHeight: 'var(--text-body-sm-lineheight)',
            letterSpacing: 'var(--text-body-sm-letterspacing)',
            fontWeight: 'var(--text-fontweight-normal)',
        },
    ],
    'caption': [
        'var(--text-caption-fontsize)',
        {
            lineHeight: 'var(--text-caption-lineheight)',
            letterSpacing: 'var(--text-caption-letterspacing)',
            fontWeight: 'var(--text-fontweight-normal)',
        },
    ],
    'tiny': [
        'var(--text-tiny-fontsize)',
        {
            lineHeight: 'var(--text-tiny-lineheight)',
            letterSpacing: 'var(--text-tiny-letterspacing)',
            fontWeight: 'var(--text-fontweight-normal)',
        },
    ],
    'button-xl': [
        'var(--text-button-label-xl-fontsize)',
        {
            lineHeight: '115%',
            letterSpacing: 'var(--text-button-label-letterspacing)',
            fontWeight: 'var(--text-button-label-fontweight)',
        },
    ],
    'button-lg': [
        'var(--text-button-label-lg-fontsize)',
        {
            lineHeight: '115%',
            letterSpacing: 'var(--text-button-label-letterspacing)',
            fontWeight: 'var(--text-button-label-fontweight)',
        },
    ],
    'button-md': [
        'var(--text-button-label-md-fontsize)',
        {
            lineHeight: '115%',
            letterSpacing: 'var(--text-button-label-letterspacing)',
            fontWeight: 'var(--text-button-label-fontweight)',
        },
    ],
    'button-sm': [
        'var(--text-button-label-sm-fontsize)',
        {
            lineHeight: '115%',
            letterSpacing: 'var(--text-button-label-letterspacing)',
            fontWeight: 'var(--text-button-label-fontweight)',
        },
    ],
    'button-xs': [
        'var(--text-button-label-xs-fontsize)',
        {
            lineHeight: 'var(--text-button-label-xs-lineheight)',
            letterSpacing: 'var(--text-button-label-letterspacing)',
            fontWeight: 'var(--text-button-label-fontweight)',
        },
    ],
    'button-caption': [
        'var(--text-button-caption-fontsize)',
        {
            lineHeight: 'var(--text-caption-lineheight)',
            letterSpacing: 'var(--text-button-caption-letterspacing)',
            fontWeight: 'var(--text-button-caption-fontweight)',
        },
    ],
}

const preset: Partial<Config> = {
    theme: {
        fontSize: typographyFontSize,
    },
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                '.uppercase': {
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--text-letterspacing-caps)',
                },
            })
        }),
    ],
}

export default preset
