<a
	id="{{ id }}"
	class="draggable component"
	style="
	display: block;
	position: absolute;
	z-index: 1;
	width: {{ style.width }}px;
	height: {{ style.height }}px;
	line-height: {{ style.lineHeight }};
	text-align: center;
	overflow: hidden;
	border: 1px dashed transparent;
	color: {{ style.color }};
	background: {{ style.background }};
	top: {{ style.top }}px;
	margin-left: {{ style.marginLeft }}px;
	border-radius: {{ style.borderRadius }}px;
	font-size: {{ style.fontSize }}px;;
	left: {{ style.left }}{{ if (style.left + '').indexOf('%') == -1 }}px{{ /if }};"

	data-category="{{ category }}"
	v-on:click="openPayConfirm({
		'productId': '{{ productId }}',
		'productCompnentDesc': '{{ productCompnentDesc }}'
	})"

	{{ if href }}
		href = {{ href }}
	{{ /if }}
><span class="text">{{ text ? text : '自定义按钮' }}</span></a>
