module.exports = {
  rootDir: './tests',
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov'],
  collectCoverageFrom: ['**/services/**', '**/utils/**', '!**/utils/logger.js'],
};
