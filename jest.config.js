// @ts-check
const { name } = require(`./package.json`);

/**
 * @type {import("@jest/types").Config.InitialOptions} 
 */
module.exports = {
  displayName: name,
  coverageDirectory: `./coverage/`,
  collectCoverage: true,
  collectCoverageFrom: [
    // include
    `./src/**/*.ts`,
    `./server/**/*.ts`,
    // exclude
    `!**/__mocks__/**/*`,
    `!**/__test__/**/*`,
    `!**/node_modules/**`,
    `!**/vendor/**`
  ],
  testEnvironment: `node`,
  verbose: true
};
