module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-props-no-spreading': [2, { 'html': 'ignore' }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'args': "none" }],
  }
};