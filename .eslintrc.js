module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': ['off'],
    'no-underscore-dangle': ['off'],
    'react/no-array-index-key': ['off'],
    'react/jsx-boolean-value': ['error', 'never', { always: ['personal'] }],
    'class-methods-use-this': ['off'],
  },
};
