import h5pConfig from 'eslint-config-h5p';

export default [
  h5pConfig,
  {
    rules: {
      'quotes': ['error', 'single'],
      'handle-callback-err': ['error'],
      'comma-dangle': ['error', 'always-multiline'],
      'import/prefer-default-export': 'off',
      'no-restricted-syntax': 'off',
      'no-plusplus': 'off',
      'no-continue': 'off',
    },
  },
];