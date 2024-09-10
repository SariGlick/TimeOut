// module.exports = {
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
//     moduleNameMapper: {
//         '\\.(css|scss)$': 'identity-obj-proxy',
//     },
// };
// module.exports = {
//     transformIgnorePatterns: [
//       "/node_modules/(?!axios)"
//     ],
//   };
  // jest.config.js
module.exports = {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest"
    },
    transformIgnorePatterns: ["/node_modules/(?!axios)"]
  };
  