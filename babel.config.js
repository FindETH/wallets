const IS_TEST = process.env.NODE_ENV === 'test';

module.exports = {
  "presets": [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": 3,
        "targets": {
          "node": "12"
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    [
      "@babel/plugin-transform-runtime",
      {
        "useESModules": !IS_TEST
      }
    ]
  ]
};
