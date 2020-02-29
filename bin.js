#!/usr/bin/env node

const exec = require('child_process').exec
const run = require('node-run-cmd').run;
const init = require('./init');

const input = process.argv[2];

switch (input) {
  case 'init':
    console.log('Initializing Assets...');
    init();
    break;
  case 'build':
    console.log('Bundling assets...');
    run('npx webpack');
    break;
  case 'watch':
    console.log('Watching for changes in asset files...')
    run('npx webpack --watch');
    break;
}


