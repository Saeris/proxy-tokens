// @ts-check

/**
 * @type {import("@babel/core").ConfigFunction}
 */
module.exports = {
  sourceMaps: `inline`,
  presets: [
    require.resolve(`@babel/preset-typescript`),
    [
      require.resolve(`@babel/preset-env`),
      {
        targets: { node: true },
        modules: `commonjs`,
        useBuiltIns: `usage`,
        corejs: 3
      }
    ]
  ]
};
