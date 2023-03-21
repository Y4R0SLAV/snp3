const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      'reducers': path.resolve(__dirname, 'src/redux/reducers'),
      'src': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'common': path.resolve(__dirname, 'src/components/common')
    },
  };
  return config;
};