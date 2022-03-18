// @ts-check

// @ts-ignore
require(`@saeris/eslint-config/patch`);

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [require.resolve(`@saeris/eslint-config`)],
  ignorePatterns: [`*.js`]
};
 