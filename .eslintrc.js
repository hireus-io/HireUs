module.exports = {
  extends: [
    './node_modules/eslint-config-airbnb-base/index.js',
    'plugin:react/recommended'
  ],
  env: {
    "browser": true,
  },
  "parserOptions": {
    "ecmaFeatures": {
        "spread": true,
        "destructuring": true,
    }
  },
  "parser": "babel-eslint",
};