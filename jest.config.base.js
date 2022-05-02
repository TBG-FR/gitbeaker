module.exports = {
  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  testTimeout: 120000,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  setupFilesAfterEnv: [
    'jest-extended/all',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(ky))',
  ],
  moduleNameMapper: {
    '^@gitbeaker/(.*)$': '<rootDir>/../../packages/$1/src',
  },
  preset: 'ts-jest/presets/js-with-ts',
}
