const fs = require('node:fs/promises');
const path = require('node:path');
const { createInstrumenter } = require('istanbul-lib-instrument');

const instrumentApplication = {
  name: 'instrument-application-for-coverage',
  setup(build) {
    build.onLoad({ filter: /\.[jt]sx?$/ }, async ({ path: sourcePath }) => {
      if (!sourcePath.includes(`${path.sep}src${path.sep}`)) return null;

      const source = await fs.readFile(sourcePath, 'utf8');
      const instrumenter = createInstrumenter({
        coverageVariable: '__coverage__',
        parserPlugins: ['jsx'],
      });
      return {
        contents: instrumenter.instrumentSync(source, sourcePath),
        loader: path.extname(sourcePath) === '.jsx' ? 'jsx' : 'js',
      };
    });
  },
};

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    files: [{ pattern: 'tests/unit/**/*.spec.js', watched: false }],
    preprocessors: {
      'tests/unit/**/*.spec.js': ['esbuild'],
    },
    esbuild: {
      bundle: true,
      format: 'iife',
      jsx: 'automatic',
      sourcemap: 'inline',
      target: 'es2020',
      loader: { '.svg': 'dataurl' },
      plugins: [instrumentApplication],
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'text-summary' }, { type: 'html' }],
    },
    browsers: ['ChromeHeadless'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-esbuild',
      'karma-coverage',
    ],
    singleRun: true,
  });
};
