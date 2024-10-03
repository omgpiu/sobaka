import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['dist'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
        ],
        parser: tseslintParser, // Используем парсер TypeScript
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': tseslintPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react-hooks/rules-of-hooks': 'error', // Обязательные правила для хуков React
            'react-hooks/exhaustive-deps': 'warn', // Предупреждения о зависимостях в хуках
        },
        settings: {
            react: {
                version: 'detect', // Автоматическое определение версии React
            },
        },
    },
];
