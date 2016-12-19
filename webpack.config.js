const path = require('path');
const webpack = require('webpack');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

const config = {
  entry: {
    server: './src/server.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve(__dirname, './src'),
    extensions: ['', '.webpack.js', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  target: 'node',
  bail: !isDebug,       //是否容忍error
  cashe: isDebug,
  debug: isDebug,

  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cashed: isVerbose,
    cachedAssets: isVerbose
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug
    }),

    //服务器端只需要一个chunk
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),

    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false}
    )
  ],
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map'
};

module.exports = config;