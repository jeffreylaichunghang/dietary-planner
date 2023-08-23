module.exports = {
  preset: 'jest-puppeteer',
  roots: ['spec'],
  globals: {
    URL: 'http://localhost:3000'
  },
  // testMatch: [
  //   '**/test/**/*.test.js'
  // ],
  // verbose: true
}

//designate the specs folder as the location of the test scripts
