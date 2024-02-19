/* This file contains ESLint*/

module.exports = {
  plugins: ['prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    jest: true,
  },

  extends: 'eslint:recommended',

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    DB_CONNS: 'writable',
    redisClient: 'writable',
    kafkaConnectionObjects: 'writable',
    consumer: 'writable',
    kafkaFailureCount: 'writable',
    lastFailureTimestamp: 'writable',
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },

  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'no-fallthrough': 'off',
  },
  ignorePatterns: ['test/mochareport/*'],
};
