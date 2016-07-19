// 引入gulp
var gulp = require('gulp'); 

var webpack         = require('webpack');
var WebpackDevServer= require('webpack-dev-server');
var gutil           = require('gulp-util');
var tmodjs          = require('gulp-tmod');
var zip             = require('gulp-zip');

/*********************************************************************/
/***************************** webpack *******************************/
/*********************************************************************/

// Webpack packaging
var webpackConfig = require('./webpack.config');

gulp.task('webpack', function() {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
  });
});

/*********************************************************************/
/************************ webpack-dev-server *************************/
/*********************************************************************/


// console.log(process.env.NODE_ENV);

var host = {
  kr95: "http://172.25.149.50:8095",
  kr93: "http://172.25.149.50:8093",
  zy: "http://172.26.69.18:8095",
  test: "http://58.215.180.211:8095",
  line: "http://121.11.64.23:8095",
  server: "http://0.0.0.0:3000"
}

gulp.task("webpack-dev-server", function(callback) {
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);

    var serverOptions = {
      contentBase: './',
      publicPath: '/mhdplatform/me/src/static',
      hot: true, // “热”刷新
      inline: true,
      stats: { colors: true }, // 给打印信息的关键字加高亮效果
      proxy: {
        // "/login":                               "http://58.215.180.210:8096",
        "/service/hd/*":                        host.kr95,     
        "/service/webhd/hdpf/*":                host.kr93,
        "/mhdplatform/service/grunt/*":         host.server
      }
    }
    var server = new WebpackDevServer(compiler, serverOptions);
    server.listen(3050, "0.0.0.0", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://admin.vip.yy.com:3050/webpack-dev-server/index.html");
    });
});

gulp.task('default', ['webpack-dev-server']);
