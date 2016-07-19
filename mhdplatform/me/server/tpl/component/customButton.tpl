<a
	id="{{ id }}"
	class="draggable component"
	style="
	display: block;
	position: absolute;
	width: {{ style.width }}px;
	height: {{ style.height }}px;
	line-height: {{ style.lineHeight }};
	text-align: center;
	color: {{ style.color }};
	background: {{ style.background }};
	top: {{ style.top }}px;
	margin-left: {{ style.marginLeft }}px;
	border-radius: {{ style.borderRadius }}px;
	font-size: {{ style.fontSize }}px;;
	left: {{ style.left }}{{ if (style.left + '').indexOf('%') == -1 }}px{{ /if }};"

	data-category="{{ category }}"

	{{ if href }}
		href = {{ href }}
	{{ /if }}

	{{ if script }}
		{{ script }}
	{{ /if }}
>{{ text ? text : '自定义按钮' }}</a>
