module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    '@react-native',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'never',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
