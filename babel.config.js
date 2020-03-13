const BUILD_OPTIONS = {
  comments: false,
  ignore: ['**/*.d.ts', '**/__mocks__/**/*', '**/*.test.ts']
};

module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-bigint'
  ],
  env: {
    cjs: {
      ...BUILD_OPTIONS,
      plugins: ['@babel/plugin-transform-modules-commonjs']
    },
    es: {
      ...BUILD_OPTIONS
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
};
