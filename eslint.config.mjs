import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTs from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config} */
export default {
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  languageOptions: {
    globals: globals.browser,
  },
  plugins: {
    '@typescript-eslint': pluginTs,
    react: pluginReact,
    prettier: pluginPrettier, // Add the prettier plugin here
  },
  rules: {
    // ESLint core rules
    ...pluginJs.configs.recommended.rules,
    // TypeScript plugin rules
    ...pluginTs.configs.recommended.rules,
    // React plugin rules
    ...pluginReact.configs.recommended.rules,
    // Prettier plugin rules
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        trailingComma: 'es5',
        arrowParens: 'always',
        bracketSpacing: true,
      },
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignores: ['**/*.spec.js', '**/*.test.js'], // Optional: files to ignore
};
