module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.js?(x)', 
    '**/?(*.)+(spec|test).js?(x)',
    'C:/Users/User/Desktop/Current/bit-by-bit/bomberman/__tests__/**/*.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'test-results', outputName: 'junit.xml' }]
  ],
  // other Jest configurations...
};
