// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  cacheDirectory: '.jest-cache',
  // coverageReporters: ['html', 'json', 'text'],
  coverageThreshold: {
    global: {
      statements: 91, // TODO: Increase this to 95
      branches: 69, // TODO: Increase this to 95
      functions: 74, // TODO: Increase this to 95
      lines: 85, // TODO: Increase this to 95
    },
  },

  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['dist/'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.(ts|tsx)', '!src/**/*.stories.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleNameMapper: {
    renderer: '<rootDir>/.jest/with-theme.tsx',
  },
}

export default config
