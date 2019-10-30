const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Elements: path.resolve(__dirname, 'src/components/elements/'),
        Parts: path.resolve(__dirname, 'src/components/parts/')
      }
    }
  }
};
