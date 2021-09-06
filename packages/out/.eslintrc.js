module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    require: true,
  },
  rules: {
    // '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 0,
    'no-plusplus': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
