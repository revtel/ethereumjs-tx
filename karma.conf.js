process.env.ethTest = 'TransactionTests'

module.exports = function (config) {
  config.set({
    browserNoActivityTimeouti: 60000,
    frameworks: ['browserify', 'detectBrowsers', 'tap'],
    files: [
      './test/transactionRunner.js',
      './test/api.js'
    ],
    preprocessors: {
      'test/*.js': ['browserify', 'env']
    },
    singleRun: true,
    plugins: [
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-env-preprocessor',
      'karma-tap',
      'karma-firefox-launcher',
      'karma-detect-browsers'
    ],
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      postDetection: function (availableBrowser) {
        if (process.env.TRAVIS) {
          return ['Firefox']
        }

        var browsers = ['Chrome', 'Firefox']
        return browsers.filter(function (browser) {
          return availableBrowser.indexOf(browser) !== -1
        })
      }
    }
  })
}