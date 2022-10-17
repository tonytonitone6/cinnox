module.exports = {
  extends: ['prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  rules: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', 'tsx'] }
    ],
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
