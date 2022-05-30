const resolveApp = require('./paths');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolveApp('dist'),
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/[name].chunk.[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      '@': resolveApp('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        sideEffects: true,
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.(vue|js)$/,
      //   use: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      // },
    ],
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    new HtmlWebpackPlugin({
      title: 'vue2-example',
      template: 'public/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    runtimeChunk: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
};