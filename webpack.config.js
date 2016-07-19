var webpack = require('webpack');
var path = require("path");

var proxy = {
  test: "http://58.215.180.211:8095",
  kr: "http://172.25.138.126:8095",
  zy: "http://172.26.83.16:8095"
}

module.exports = {
  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack-dev-server/client?http://admin.m.vip.yy.com:3050',
    './mhdplatform/me/src/main.js'
  ],
  output: {
    path: path.join(__dirname, "./mhdplatform/me/src/static"),
    publicPath: "./mhdplatform/me/src/static/",
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './',
    publicPath: '/mhdplatform/me/src/static',
    stats: { colors: true }, // 给打印信息的关键字加高亮效果
    proxy: {
      // "/mhdplatform/*":                       'http://172.26.130.217:3050',
      "/":                                    proxy.test,
      "/index":                               proxy.test,
      "/static/*":                            proxy.test,
      "/auth/*":                              proxy.test,
      "/service/hd/*":                        proxy.test,
      "/service/webhd/hdpf/*":                "http://58.215.180.211:8095",
      "/mhdplatform/service/grunt/*":         "http://localhost:3000"
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/, loader: 'style-loader!css-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        // make sure to exclude 3rd party code in node_modules
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          compact: false
        }
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          // inline files smaller then 10kb as base64 dataURL
          limit: 10000,
          // fallback to file-loader with this naming scheme
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.tpl$/,
        loader: "tmod",
        query: {
          // 编译输出目录设置
          output: "./",

          // 设置输出的运行时路径
          runtime: "./mhdplatform/me/src/library/template.min.js",

          // 定义模板采用哪种语法，内置可选：
          // simple: 默认语法，易于读写。可参看语法文档
          // native: 功能丰富，灵活多变。语法类似微型模板引擎 tmpl
          syntax: "simple",

          // 模板文件后缀
          suffix: '.tpl'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
