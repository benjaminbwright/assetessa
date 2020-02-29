#!/usr/bin/env node

const run = require('node-run-cmd').run;
const init = require('./init');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const input = process.argv[2];

const compiler =  webpack(webpackConfig);

switch (input) {
  case 'init':
    console.log('Initializing Assets...');
    init();
    break;
  case 'build':
    console.log('Bundling assets...');
    run('npx webpack');
    compiler.run((err, stats) => {
      if (err) {
        console.log(err);
      }
      console.log(stats);
    });
    break;
  case 'watch':
    console.log('Watching for changes in asset files...')
    compiler.watch({
      // Example watchOptions
      aggregateTimeout: 300,
      poll: undefined
    }, (err, stats) => { // Stats Object
      // Print watch/build result here...
      console.log(stats);
    })
    break;
}