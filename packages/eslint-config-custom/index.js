const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const sveltePlugin = require('eslint-plugin-svelte');
const svelteParser = require('svelte-eslint-parser');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  // Base JavaScript configuration
  js.configs.recommended,
  
  // Prettier configuration (must be last to override)
  prettierConfig,
  
  // TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
    ignores: ['**/*.svelte.ts', '**/*.svelte.js'], // Svelte 5 runes files are handled differently
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  
  // Svelte files
  ...sveltePlugin.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  
  // Ignores
  {
    ignores: [
      '**/*.cjs',
      '**/*.svelte.ts', // Svelte 5 runes files - skip for now due to parser limitations
      '**/*.svelte.js',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/dist/**',
      '**/build/**',
      '**/.svelte-kit/**',
      '**/coverage/**',
    ],
  },
];
