'use strict';

const browserSync = require('browser-sync').create('server');
const _ = require('lodash');

module.exports = (gulp, config, tasks) => {
  const watchFiles = [];

  // Define CSS files to watch
  if (config.css.enabled) {
    watchFiles.push(config.css.dest + '*.css');
  }

  // Define JS files to watch
  if (config.js.enabled) {
    watchFiles.push(config.js.dest + config.js.destName);
  }

  // Define specific files to watch which have been added through config
  if (config.browserSync.watchFiles) {
    config.browserSync.watchFiles.forEach((file) => {
      watchFiles.push(file);
    });
  }

  const options = {
    browser: config.browserSync.browser,
    files: watchFiles,
    port: config.browserSync.port,
    tunnel: config.browserSync.tunnel,
    open: config.browserSync.openBrowserAtStart,
    reloadDelay: config.browserSync.reloadDelay,
    reloadDebounce: config.browserSync.reloadDebounce
  };
  if (config.browserSync.domain) {
    _.merge(options, {
      proxy: config.browserSync.domain,
      startPath: config.browserSync.startPath
    });
  }
  else {
    _.merge(options, {
      server: {
        baseDir: config.browserSync.baseDir
      },
      startPath: config.browserSync.startPath
    });
  }
  gulp.task('serve', 'Create a local server using BrowserSync', () => {
    return browserSync.init(options);
  });
  tasks.default.push('serve');
};
