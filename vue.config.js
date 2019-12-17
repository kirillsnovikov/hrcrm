const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Elements: path.resolve(__dirname, 'src/components/elements/'),
        Parts: path.resolve(__dirname, 'src/components/parts/')
      }
    },
    plugins: [new StylelintPlugin()]
  },
  css: {
    loaderOptions: {
      sass: {
        // prependData: `@import "@/assets/scss/main.scss";`
      }
    }
  }
};
