const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    index: './src/index.ts'
  },

  output: {
    path: path.resolve( __dirname, 'public' )
  },

  plugins: [ new webpack.ProgressPlugin() ],

  module: {
    rules: [ {
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      include: [],
      exclude: [ /node_modules/ ]
    } ]
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    open: true
  },

  optimization: {
    minimizer: [ new TerserPlugin() ],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  }
};
