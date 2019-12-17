module.exports = {
  "presets": [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        "modules": false,
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    [
      "@babel/plugin-transform-runtime",
      {
        "useESModules": true
      }
    ]
  ],
  "env": {
    "test": {
      "presets": [
        [
          "@babel/preset-env",
          {
            "modules": "commonjs",
            "targets": {
              "node": "current"
            }
          }
        ]
      ],
      "plugins": [
        [
          "@babel/plugin-transform-runtime",
          {
            "useESModules": false
          }
        ]
      ]
    }
  }
};
