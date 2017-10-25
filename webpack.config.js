(function () {
  "use strict";
  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require("html-webpack-plugin");
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
            use: ["css-loader", "sass-loader"],
          })
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Index Page',
        filename: 'index.html',
        template: './src/index.html'
      }),
      new ExtractTextPlugin({
        filename: '[name].[hash].css'
      })
    ]
  };
  module.exports = config;
}());
