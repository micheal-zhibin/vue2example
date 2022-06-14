const resolveApp = require('./paths');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MFBDT = require('@tencent/mfbdt/dist/mfbdt').default;
const path = require('path');

const mfbdt = new MFBDT({
  implementor: webpack,
  buildDepWithESBuild: {},
  depBuildConfig: {
  },
  isDebug: true,
  // routerFile: path.join(process.cwd(), `./src/routes/${process.env.BIZ_MODULE}-routes.jsx`),
  // lazyCompileExclude: ['containers/app/App', 'constants/misc'],
});

const webpackConfig = {
  entry: {
    main: path.join(process.cwd(), './src/main.js'),
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
    port: 8000,
    client: {
      logging: 'info',
    },
    hot: 'only',
    historyApiFallback: true,
    // setupMiddlewares(middlewares) {
    //   for (const middleware of mfbdt.getMiddlewares()) {
    //     middlewares.push(middleware);
    //   }
    //   return middlewares;
    // },
  },
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
        loader: 'vue-loader',
        // use: {
        //   loader: 'vue-loader',
        //   options: {
        //     loaders: {
        //       js: [
        //         { loader: 'babel-loader', options: { plugins: [...mfbdt.getBabelPlugins()], } }
        //       ]
        //     }
        //   }
        // },
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              // ...mfbdt.getBabelPlugins(),
            ],
          },
        },
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
    new webpack.DefinePlugin({
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
    chunkIds: 'named',
  },
};

const res = mfbdt.setWebpackConfig({
  config: webpackConfig,
});

console.log('--res--', res);

module.exports = res;
