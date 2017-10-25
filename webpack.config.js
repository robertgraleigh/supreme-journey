(function () {
  "use strict";
  const path = require('path');
  const webpack = require('webpack');
  const ExtractTextPlugin = require("extract-text-webpack-plugin");

  const config = {
    entry: {
      app: './src/js/app.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.css$/,
          use: 'css-loader'
        },
        {
          test: /\.(scss|sass)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }],
          })
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].[hash].css'
      })
    ]
  };
  module.exports = config;
}());
