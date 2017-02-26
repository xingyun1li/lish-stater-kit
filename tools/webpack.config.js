const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyse = process.argv.includes('--analyse') || process.argv.includes('--analyze');     //...
const port = parseInt(process.env.PORT || '3000', 10);
const analyzerPort = port + 3;

let analyzerMode = 'disabled';
if (isAnalyse) {
  analyzerMode = 'server';
} else if (!isDebug) {
  analyzerMode = 'static'
}

const config = {
  context: path.resolve(__dirname, '../src'),
  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    pathinfo: isVerbose
  },
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
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules']
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
    ...config.output,
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

    new BundleAnalyzerPlugin({
      analyzerMode,
      analyzerHost: '127.0.0.1',
      analyzerPort,
      reportFilename: path.resolve(__dirname, '../report.html'),
      openAnalyzer: true,
      generateStatsFile: !isDebug,
      statsFilename: path.resolve(__dirname, '../stats.json'),
      statsOptions: null,
      logLevel: 'info'
    })
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
    ...config.output,
    filename: '../../server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  module: {
    ...config.module,

    // Override babel-preset-env configuration for Node.js
    rules: config.module.rules.map(rule => (rule.loader !== 'babel-loader' ? rule : {
      ...rule,
      query: {
        ...rule.query,
        presets: rule.query.presets.map(preset => (preset[0] !== 'env' ? preset : ['env', {
          targets: {
            node: parseFloat(pkg.engines.node.replace(/^\D+/g, '')),
          },
          modules: false,
          useBuiltIns: false,
          debug: false,
        }])),
      },
    })),
  },
  resolve: { ...config.resolve},
  externals: [
    /^\.\/assets\.json$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],
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