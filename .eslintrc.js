module.exports = {
  extends: ['prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'no-undef': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-for': 0
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
