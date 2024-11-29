// export default {
//   testEnvironment: "node",
//   testTimeout: 40000,
//   setupFilesAfterEnv: ["./tests/setup.js"],
//   transform: {
//     "^.+\\.jsx?$": "babel-jest", // Add Babel transformation for ES6
//   },
//   moduleFileExtensions: ["js", "json", "node"],
//   extensionsToTreatAsEsm: [".js"],
// };

module.exports = {
  testEnvironment: "node",
  testTimeout: 400000,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Use Babel to transform JS files
  },
  moduleFileExtensions: ["js", "json", "node"],
};
