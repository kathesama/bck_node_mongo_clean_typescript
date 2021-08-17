export default {
  // globals: {
  //   extensionsToTreatAsEsm: ['.ts', '.js'],
  //   'ts-jest': {
  //       useESM: true
  //   }
  // },
  // preset: 'ts-jest/presets/js-with-ts-esm',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/config/*.ts',
    '!<rootDir>/src/main/routes/*.ts',
    '!<rootDir>/src/main/middlewares/ddos.middleware.ts',
    '!<rootDir>/src/main/adapters/express.adapter.ts',
    '!<rootDir>/src/main/middlewares/index.ts',
  ],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  // Indicates whether the coverage information should be collected while executing the test
  modulePathIgnorePatterns: ['<rootDir>/src/interfaces', '<rootDir>/src/main/server', '<rootDir>/src/main/routes'],
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
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '.+\\.ts$': 'ts-jest',
    "^.+\\.js$": "babel-jest"
  },
};
