// const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
//   acc[`jsx-a11y/${rule}`] = 'off';
//   return acc;
// }, {});

module.exports = {
  extends: '../../.eslintrc.js',
  parserOptions: {
    project: 'tsconfig.json',
  },
};
