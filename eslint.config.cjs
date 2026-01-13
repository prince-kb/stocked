module.exports = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'dist/**', 'public/**'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
      // project-specific overrides go here
      'react/react-in-jsx-scope': 'off',
    },
  },
];
