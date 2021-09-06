const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off';
  return acc;
}, {});

module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: [
    'airbnb-typescript',
    // "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended"
    // "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['jsx', 'tsx'] }],
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'generator-star-spacing': 0,
    'operator-linebreak': 0,
    'react-hooks/exhaustive-deps': 0,
    ...a11yOff,
  },
  globals: {},
};
