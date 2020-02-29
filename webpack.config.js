const fs = require('fs');
const path = require('path');
const init = require('./init');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// initialize project
init();


const config = require('../assets/assets.config.js')
// const pageScriptDir = config.pageScriptDir || "assets/js/pagescripts";
const pageScriptDir = "assets/js/pagescripts";

// setup webpack entry for js from pagescripts
const jsEntries = {
  main: path.join(__dirname,"../",pageScriptDir,"main.js"),
  ...config.jsEntries
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
  mode: config.mode,
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../dist/"
            }
          },
          {
            loader: 'css-loader',
            options: {
              import: true
            }

          },
          {
            loader: 'sass-loader',
          }
          
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      path: '../dist/css',
      filename: 'style.css',
    }),
  ],
  
  
}

