module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    jest: true,
    browser: true,
    es6: true
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:prettier/recommended' // Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    'no-eval': 2,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    //ignored
    'no-shadow': 0,
    '@typescript-eslint/no-namespace': 0
  }
};