const fs = require('fs');
const path = require('path');
const config = require('../assets/assets.config.js')

const pageScriptDir = config.pageScriptDir || "assets/js/pagescripts";

// setup webpack entry for js from pagescripts
const jsEntries = {
  main: path.join(__dirname,"../",pageScriptDir,"main.js")
}

fs
  .readdirSync(__dirname + "/../" + pageScriptDir)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    jsEntries[file.split('.')[0]] = path.join(__dirname,'../',pageScriptDir,file);
  });
  console.log(jsEntries)

// Webpack Config
module.exports = {
  mode: "development",
  entry: (Object.keys(jsEntries).length !== 0) ? jsEntries : "./index.js",
  output: {
    path: __dirname + "/../dist",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
  
}

