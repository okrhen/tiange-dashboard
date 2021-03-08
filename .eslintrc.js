module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: ['airbnb-typescript', 'prettier'],
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'react/jsx-props-no-spreading': [2, {'html': 'ignore'}]
    }
  };