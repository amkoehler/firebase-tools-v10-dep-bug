const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['lib/', 'node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testEnvironment: 'node',
  rootDir: 'test',
  resolver: 'jest-node-exports-resolver',
  moduleNameMapper: pathsToModuleNameMapper({
    uuid: ['uuid/dist/index.js'],
  }),
};
