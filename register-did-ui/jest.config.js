module.exports = {
  testRegex: "((\\.|/*.)(spec))\\.jsx$",
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
