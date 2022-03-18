module.exports = {
  "src/**/*.{j,t}s": (filenames) => [
    `prettier --write ${filenames.join(` `)}`, // Applies code formatting
    `yarn format --quiet ${filenames.join(` `)}` // Lints & Applies automatic fixes to problems
  ]
};
