module.exports = {
  "extends": [
    "eslint-config-airbnb"
  ],
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
    "overwolf": false,
    "OwAd": false
  },
  "rules": {
    "linebreak-style": 0,
    "no-bitwise": 0,
    "no-console": 0,
    "no-mixed-operators": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0
  }
};
