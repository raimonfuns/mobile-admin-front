<template>
	<div class="page-main">
		
		<router-view></router-view>
		
	</div>
</template>

<style lang="stylus">
* {
	margin: 0;
	padding: 0;
}
html, body, .page-main {
	height: 100%;
}
li {
	list-style: none;
}
/*清除浮动*/
.cl:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; } 
.cl { zoom: 1; }
.clear {clear:both;display:inline;}

/*显示隐藏*/
.show{display:block;} 
.hide{display:none;}

/*定位*/
.pa{position: absolute;}
.pr{position: relative;}

/*左右浮动*/
.fl{float:left;}
.fr{float:right;}

/*字体抗锯齿*/
.thin {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}

/*单行文字超出显示省略号*/
.ell {overflow:hidden; white-space:nowrap; text-overflow:ellipsis;word-wrap:normal;}

/*隐藏文字*/
.hideText {
	text-indent: -9999px;
	overflow: hidden;
}

/*loading*/
.loadicon{
	background-image:url(http://file.do.yy.com/group3/M00/5B/2F/tz0MYFVa96KANioDAAAOiKQYvkU366.gif); 
	background-repeat: no-repeat;  
	background-position:center center;
}

/*居中*/
.center {
	text-align: center;
}

/********************** mixins *************************/
/*按钮*/
btn(width, height, fontSize) {
	display: block;
	width: width;
	height: height;
	line-height: height;
	text-align: center;
	font-size: fontSize;
}

/*margin*/
mt(n) {
	margin-top: n;
}
mr(n) {
	margin-right: n;
}
mb(n) {
	margin-bottom: n;
}
ml(n) {
	margin-left: n;
}

/*padding*/
pt(n) {
	padding-top: n;
}
pr(n) {
	padding-right: n;
}
pb(n) {
	padding-bottom: n;
}
pl(n) {
	padding-left: n;
}

/*width、height*/
w(n) {
	width: n
}
h(n) {
	height: n
}

/*border*/
bd(color) {
	border: 1px solid color;
}
bdt(color) {
	border-top: 1px solid color;
}
bdr(color) {
	border-right: 1px solid color;
}
bdb(color) {
	border-bottom: 1px solid color;
}
bdl(color) {
	border-left: 1px solid color;
}

/*font-size*/
fs(n) {
	font-size: n;
}

/*inline-block*/
dib-wrap() {
	font-size:0;/* 所有浏览器 */
	*word-spacing:-1px;/* IE6、7 */
	@media screen and (-webkit-min-device-pixel-ratio:0){
		.dib-wrap{
			letter-spacing:-5px;
		}
	}
	
}
dib() {
	display: inline-block;
	font-size: 14px;
	letter-spacing: normal;
	word-spacing: normal;
	vertical-align:top;
	*display:inline;
	*zoom:1;
}

// resizable
.ui-resizable {
	border: 1px solid transparent;
}
.ui-resizable:hover {
	border: 1px dashed #eee !important;
}

// loading
.loadingWrap {
	padding: 20px 0;
}
.message {
	text-align: center;
}
</style>