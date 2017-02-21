const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

const config = {
  context: path.resolve(__dirname, '../src'),
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
  stats: {
    colors: true,
    warnings: isVerbose,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose
  },
  bail: !isDebug,
  cache: isDebug
};

const clientConfig = {
  ...config,
  entry: {
    client: './client.js',
  },

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },

  target: 'web',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),

    ...isDebug ? [] : [
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: isVerbose,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ],
  ],
  devtool: isDebug ? 'cheap-module-source-map' : false,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

const serverConfig = {
  ...config,
  entry: {
    server: './server.js',
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: isDebug ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash].chunk.js'
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ],
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map'
};

module.exports = [serverConfig, clientConfig];