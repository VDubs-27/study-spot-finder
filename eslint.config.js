import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        rules: {
            indent: ['error', 4, { SwitchCase: 1 }],
            'no-mixed-spaces-and-tabs': 'error',
        },
        languageOptions: {
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
    },
])
