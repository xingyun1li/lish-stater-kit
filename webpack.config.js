const path = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const config = {
  entry: {
    verdor: ['react', 'react-dom'],
    server: './server.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[chunkhash].js'
  },
  target: 'node',
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  target: 'node',
  context: path.resolve(__dirname, 'src'),
  plugins: [
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
      filename: 'assets.json'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    })
  ]
};

module.exports = config;