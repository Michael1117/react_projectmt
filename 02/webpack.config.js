const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry:  './src/app.js', 
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 2048,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebapckPlugin({
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    usedExports: true,
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true
  }
};