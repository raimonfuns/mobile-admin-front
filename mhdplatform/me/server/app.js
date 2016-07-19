var express 			= require('express');
var request 			= require('request');
var fs      			= require('fs');
var bodyParser 			= require('body-parser');
var template 			= require('art-template');
var webpack 			= require('webpack');
var uglifyJS   			= require("uglify-js");
var htmlMinify 			= require('html-minifier').minify;
var _   				= require("underscore");

function log(value) {
	console.log(value);
}

var app = module.exports = express();
var env = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);
app.set('port', 3000);

/*
 ***************************************************************************************************
 * 添加一些插件来解析post请求的数据，然后就可以使用req.body这个对象来获取post参数，并设置数据的最大值
 ***************************************************************************************************
 */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/*
 ***************************************************************************************************
 * artTemplate模板设置
 ***************************************************************************************************
 */
template.config('base', __dirname);// 设置模板根目录，默认为引擎所在目录
template.config('extname', '.tpl');// 指定模板后缀名
template.config('escape', false);

/*
 ***************************************************************************************************
 * 生成文件
 ***************************************************************************************************
 */
app.post('/mhdplatform/service/grunt/nser/makefile/:dir', function(req, res) {

	console.log(req.params.dir);

	// 输入目录
	var destDir = req.params.dir;

	if (destDir == 'buildfiles' && env != 'product') {
		res.send({result: false, desc: '只有正式环境才可以发布活动哦'});
		return false;
	}

	// 原网页的数据
	var jsonFromOriginPage = req.body;

	// 检查数据
	if(!jsonFromOriginPage.component || jsonFromOriginPage.component.length == 0) jsonFromOriginPage.component = [];
	if(!jsonFromOriginPage.pageStyle) jsonFromOriginPage.pageStyle = {};

	// 生成index.vue的组件
	createIndexVue();

	// 生成app.vue的组件
	createAppVue();

	// 生成act_main.js文件
	createActMainJs();

	// webpack打包
	run_webpack(function () {
		// 目录地址
		var targetDir = __dirname.replace('server', destDir) + '/' + jsonFromOriginPage.index;

		createDir(targetDir);
		createIndexJs();
		createIndexHtml();

		// 发布
		if (destDir == 'buildfiles') {
			log('我要发布啦');
			release(jsonFromOriginPage.index, 'index.html');
			release(jsonFromOriginPage.index, 'index.js');
		}

		res.send({result: true});
		clearTempFile();

		/*
		 ***********************************
		 * 创建目录、创建文件、清除文件
		 ***********************************
		 */
		function createDir(targetDir) {
			if (!fs.existsSync(targetDir)){
			    fs.mkdirSync(targetDir);
			}
		}

		function createIndexJs() {
			var bundleJsContentMin = uglifyJS.minify(__dirname.replace('server', 'preview') + '/bundle.js').code;
			fs.writeFileSync(targetDir + '/index.js', bundleJsContentMin);
		}

		function createIndexHtml() {
			var htmlFileContent = getMainHtml();
			fs.writeFileSync(targetDir + '/index.html', htmlFileContent);
			// console.log(getMainHtml());
			console.log('...success:...');
		}

		function clearTempFile() {
			fs.unlink(__dirname.replace('server', 'preview') + '/bundle.js'); // bundle.js
			fs.unlink(__dirname.replace('server', 'src') + '/components/act/index.vue'); // index.vue
			fs.unlink(__dirname.replace('server', 'src') + '/components/act/app.vue'); //app.vue
		}
	});

	/*
	 ***********************************
	 * 读取html和js文件
	 ***********************************
	 */
	function getMainHtml() {
		return htmlMinify(tranformPxToRem(template('tpl/html/content', jsonFromOriginPage.pageParams)), {
			minifyCSS: true
		});
	}

	function getComponentsHtml() {
		var result = '';

		// components
		var componentsContent = '';
		for (var currentPage = 0; currentPage < jsonFromOriginPage.pageStyle.pageCount; currentPage++) {

			var _currentPage = currentPage + 1;

			componentsContent += '<div class="swipePage" v-bind:class="{vCurrent: currentPage == ' + _currentPage + ', topOut: topOut && currentPage == ' + _currentPage + ', topIn: topIn && currentPage == ' + (_currentPage - 1) + ', bottomOut: bottomOut && currentPage == ' + _currentPage + ', bottomIn: bottomIn && currentPage == ' + (_currentPage + 1) + ', vNext: vNext && currentPage == ' + (_currentPage - 1) + ', vPrev: vPrev && currentPage - 1 == ' + _currentPage + '}"><div class="swipePage-main">';

			_.each(jsonFromOriginPage.component, function (specificCategoryComponents, category) {
				_.each(specificCategoryComponents, function (component) {
					if (category != 'menuButton') {
						if (component.page == (_currentPage)) {
							// 去背景颜色
							// var bgTransparentFilterArr = [];
							// bgTransparentFilterArr.push('rank');
							// bgTransparentFilterArr.push('rank_spec_number1');
							// bgTransparentFilterArr.push('rank_spec_number2');
							// bgTransparentFilterArr.push('rank_spec_number3');
							//
							// // && destDir == 'release'
							// if (bgTransparentFilterArr.indexOf(category) != -1) {
							// 	log('bgTransparentFilterArr.indexOf(category): ' + bgTransparentFilterArr.indexOf(category));
							// 	// if (component.style.background.indexOf('rgba') != -1) {
							// 		component.style.background = 'rgba(0, 0, 0, 0)'; // 按钮背景透明
							// 		component.style.color = 'rgba(0, 0, 0, 0)';		 // 字体透明
							// 	// }
							// }
							componentsContent += template('tpl/component/' + category, component);
						}
					}
				});
			});

			componentsContent += '</div></div>';
		}

		result = template('tpl/html/index', {
			componentsHtml: tranformPxToRem(componentsContent),
			menuButtonHtml: tranformPxToRem(getMenuButtonHtml()),
			pageParams: jsonFromOriginPage.pageParams
		})
1
		return result;
	}

	function getAppHtml() {
		var result = '';
		var menuList = [];

		_.each(jsonFromOriginPage.component['menuButton'], function (component) {
			menuList = component.menuItemList.split(',');
		});

		result = template('tpl/html/app', {
			menuList: menuList,
			menuButtonHtml: tranformPxToRem(getMenuButtonHtml()),
			pageCount: jsonFromOriginPage.pageParams.pageCount
		});

		return result;
	}

	function getMenuButtonHtml() {
		var result = '';

		_.each(jsonFromOriginPage.component['menuButton'], function (component) {
			result = template('tpl/component/menuButton', component);
		});

		return result;
	}

	function getActMainJsContent() {
		var routerComponents = [];
		var customButtons = jsonFromOriginPage.component.customButton;

		_.each(customButtons, function (component) {
			var _responsibility = component.responsibility;
			if (_responsibility && _responsibility != 'default' && routerComponents.indexOf(_responsibility) == -1) {
				routerComponents.push(_responsibility);
			}
		});

		return template('tpl/js/act_main', {routerComponents: routerComponents});
	}

	/*
	 ***********************************
	 * 单位转换 px -> rem
	 ***********************************
	 */
	function tranformPxToRem(content) {
		return content.replace( /([\d|.]+px)/g, function( $, $1 ) {
	        return (parseInt($1)/64 * (3.4 / 1.52)).toFixed(6) + 'rem';
	    });
	}

	/*
	 ***********************************
	 * 生成main.js、index.vue、app.vue
	 ***********************************
	 */
	function createIndexVue() {
		fs.writeFileSync(__dirname.replace('server', 'src') + '/components/act/index.vue', getComponentsHtml());
	}

	function createAppVue() {
		fs.writeFileSync(__dirname.replace('server', 'src') + '/components/act/app.vue', getAppHtml());
	}

	function createActMainJs() {
		fs.writeFileSync(__dirname.replace('server', 'src') + '/act_main.js', getActMainJsContent());
	}

	/*
	 ***********************************
	 * 发布
	 ***********************************
	 */
	function release(hdindex, fileName) {

		var formData = {
		  hdindex: hdindex,
		  files: fs.createReadStream(__dirname.replace('server', 'buildfiles') + '/' + hdindex + '/' + fileName)
		};

		request.post({url:'http://14.17.109.147:8094/filerev/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
		  console.log('-- 14.17.109.147 --')
		  console.log(body + '(' + fileName + ')');
		});

		request.post({url:'http://119.188.45.85:8094/filerev/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
		  console.log('-- 119.188.45.85 --')
		  console.log(body + '(' + fileName + ')');
		});

		request.post({url:'http://183.136.136.182:8094/filerev/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
		  console.log('-- 183.136.136.182 --')
		  console.log(body + '(' + fileName + ')');
		});

		request.post({url:'http://218.60.71.39:8094/filerev/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
		  console.log('-- 218.60.71.39 --')
		  console.log(body + '(' + fileName + ')');
		});
	}
});

/*
 ***************************************************************************************************
 * webpack打包js生成act_bundle.js
 ***************************************************************************************************
 */
function run_webpack(callback) {
	var act_webpackConfig = require('../act_webpack.config');
	webpack(act_webpackConfig, function(err, stats) {
		callback();
	});
}
