const webpack = require('webpack')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('lunbo', resolve('src/assets/img/lunbo'))
      .set('network', resolve('src/network'))
      .set('videoplaying', resolve('src/assets/img/videoplaying/'))
  },
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 http://127.0.0.1/
        target: 'http://127.0.0.1',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

}