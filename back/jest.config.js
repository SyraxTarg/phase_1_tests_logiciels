/**
 * Jest Configuration for Backend
 */

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/unit/**/*.test.js',
    '**/__tests__/functional/**/*.test.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/generated/',
  ],
  setupFilesAfterEnv: [],
  testTimeout: 10000,
};

module.exports = config;
