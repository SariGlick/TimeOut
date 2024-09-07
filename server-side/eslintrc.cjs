module.exports = {
  env: {
    node: true
  },
  // plugins: ['import'],
  rules: {
    indent: ['error',  'tab'], 
    'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true } }],
    'import/no-unused-modules': ['error', { unusedExports: true }],
    'no-unused-vars': 'error',
    'no-const-assign': 'error',
    'prefer-const': ['error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: true
    }],
    'import/no-unresolved': ['error']
  }
};
