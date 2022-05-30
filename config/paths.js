const path = require('path');

const appRoot = process.cwd();

const resolveApp = (resolvePath) => {
  return path.resolve(appRoot, resolvePath);
};

module.exports = resolveApp;