module.exports = {
  "extends": "eslint-config-airbnb",
  "parser": "babel-eslint",
  "settings": {"ecmascript": 6},
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "destructuring": true,
      "classes": true,
      "forOf": true,
      "blockBindings": true,
      "arrowFunctions": true
    }
  },
  "env": {
    "browser": true
  },
  "globals": {
    "overwolf": true
  },
  "rules": {
    "arrow-body-style": 0,
    "arrow-parens": 0,
    "class-methods-use-this": 0,
    "func-names": 0,
    "indent": 2,
    "new-cap": 0,
    "no-plusplus": 0,
    "no-return-assign": 0,
    "quote-props": 0,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never"
    }],
    "linebreak-style": ["off"],
    "jsx-quotes": [2, "prefer-single"],
    "react/forbid-prop-types": 0,
    "react/jsx-curly-spacing": [2, "always"],
    "react/jsx-filename-extension": 0,
    "react/jsx-boolean-value": 0,
    "react/prefer-stateless-function": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": ["off"],
    "jsx-a11y/no-static-element-interactions": ["off"],
    "jsx-a11y/img-has-alt": ["off"],
    "react/require-default-props": ["off"],
    "prefer-rest-params": ["off"]
  }
};
