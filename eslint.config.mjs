import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginPrettier from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Use Prettier integration to disable conflicting rules and enable the Prettier rule.
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
