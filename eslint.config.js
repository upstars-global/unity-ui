// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...vue.configs["flat/recommended"],
    {
        files: ["**/*.{ts,tsx,vue}"],
        rules: {
            "vue/multi-word-component-names": "off"
        }
    },
    ...storybook.configs["flat/recommended"]
];