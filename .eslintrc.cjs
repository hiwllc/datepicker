/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/dist/**/*', '**/scripts/**/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',

    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}

module.exports = config
