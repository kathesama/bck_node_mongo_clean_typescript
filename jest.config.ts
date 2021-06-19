/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // The test environment that will be used for testing
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // coveragePathIgnorePatterns: ['node_modules', 'src/main/config', 'src/app.js', 'tests'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // Indicates whether the coverage information should be collected while executing the test
  modulePathIgnorePatterns: [
    '<rootDir>/src/interfaces',
    '<rootDir>/src/main/config',
    '<rootDir>/src/main/server',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
