const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

module.exports = () => {
  const isDev = process.env.NODE_ENV !== 'production';
  return isDev ? devConfig : prodConfig;
}