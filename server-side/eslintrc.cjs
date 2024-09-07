module.exports = {
    env: {
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:import/recommended'
    ],
    plugins: ['import'],
    rules: {
      indent: ['error', 'tab'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true } }],
      'no-unused-vars': 'error',
      'no-const-assign': 'error',
      'prefer-const': ['error', {
        destructuring: 'all',
        ignoreReadBeforeAssign: true
      }],
      'import/no-unresolved': ['error']
    }
  };
  