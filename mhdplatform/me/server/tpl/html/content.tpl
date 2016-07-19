<!DOCTYPE html>
<html lang="en">
<head>

<link rel="dns-prefetch" href="http://vipweb.bs2cdn.yy.com/">
<link rel="dns-prefetch" href="http://dl2.vip.yystatic.com/">
<link rel="dns-prefetch" href="http://res.udb.duowan.com/">

<meta charset="UTF-8">
<title>活动页面123</title>
<style>
/*全局样式*/
*{margin:0; padding:0;}
table{border-collapse:collapse; border-spacing:0;}
fieldset,img{border:0;}
address,caption,cite,code,dfn,em,var,i{font-style:normal; font-weight:normal;}
ul,ol,li{list-style:none;}
h1,h2,h3,h4,h5,h6{font-weight:normal;}
html {font-size: 62.5%}
input,textarea {outline:none;resize:none;}
pre,p{ white-space: -webkit-pre-wrap;white-space: -moz-pre-wrap; white-space: pre-wrap; word-wrap: break-word;}
a {-webkit-tap-highlight-color: rgba(255, 255, 255, 0);-webkit-focus-ring-color: rgba(0, 0, 0, 0);outline: none;border: none;text-decoration:none;}
a:hover{ }
body {font-size:1.2rem;font-family:"Microsoft Yahei";color:#666;background-color: #fff}


html {
	height: 100%;
}
body {
	width: 10rem;
	min-height: 100%;
	margin: 0 auto;
	position: relative;
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-image: url({{ singleBgUrl }});
	background-color: {{ backgroundColor }};
	{{ if pageCount > 1 }}
	height: 100%;
	{{ else }}
	height: {{ pageHeight }}px;
	{{ /if }}
}

/*按钮颜色*/
.btn-style-blue {
	background: #5BC6D1;
	border-radius: 0.125rem;
}
.btn-style-green {
	background: #67DBA3;
	border-radius: 0.125rem;
}

/*页面动画切换效果*/
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}

/*引导图标*/
.guide {
	position: absolute;
	z-index: 1;
	height: 0.8rem;
	bottom: 1.5rem;
	left: 50%;
	margin-left: -0.5rem;
	animation: slideOutDown 1.5s ease .5s infinite;
	-webkit-animation: slideOutDown 1.5s ease .5s infinite;
}
@keyframes slideOutDown{
	from {
		-webkit-transform:translate3d(0,0,0);
		transform:translate3d(0,0,0);
	}
	to {
		-webkit-transform:translate3d(0,100%,0);
		transform:translate3d(0,100%,0)
	}
}
@-webkit-keyframes slideOutDown{
	from {
		-webkit-transform:translate3d(0,0,0);
		transform:translate3d(0,0,0);
	}
	to {
		-webkit-transform:translate3d(0,100%,0);
		transform:translate3d(0,100%,0)
	}
}

/*字体库*/
@font-face {
  font-family: "iconfont";
  src: url('../../commonStatic/iconfont.ttf') format('truetype'),
  url('../../commonStatic/iconfont.svg') format('svg');
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:1rem;
}

#app {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
<script src="http://vipweb.bs2cdn.yy.com/flexible.js"></script>
</head>
<body>
	{{ if singleBgUrl }}
		<img src="{{ singleBgUrl }}" width="100%">
	{{ /if }}
	<div id="app"></div>
	<script src="http://vipweb.bs2cdn.yy.com/vue.1.0.24.min.js"></script>
	<script src="./index.js"></script>
</body>
</html>
