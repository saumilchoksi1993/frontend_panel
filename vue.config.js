const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        L: 'leaflet',
      })
    ]
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    hot: true,
  },
};
