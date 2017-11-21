(function () {
  "use strict";
  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");

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
          use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"],
          })
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'img/'
              }
            }
          ]
        }
      ]
    },
    watch: true,
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Index Page',
        filename: 'index.html',
        template: './src/index.html'
      }),
      new HtmlWebpackPlugin({
        title: 'Cart',
        filename: 'cart.html',
        template: './src/cart.html'
      }),
      new ExtractTextWebpackPlugin({
        filename: 'css/[name].css'
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/img',
          to: 'img'
        }
      ])
    ]
  };
  module.exports = config;
}());
