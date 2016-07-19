<div
  id="{{ id }}"
  class="draggable component"
  data-category="{{ category }}"
  data-group="{{ rankGroupName }}"
  style="
	position: absolute;
	z-index: 1;
  width: {{ style.width }}px;
	text-align: center;
	color: {{ style.color }};
	top: {{ style.top }}px;
	margin-left: {{ style.marginLeft }}px;
  background: {{ style.background }};
	font-size: 12px;
	left: {{ style.left }}{{ if (style.left + '').indexOf('%') == -1 }}px{{ /if }};"
>
  <p style="text-align: center; margin-bottom: 2px; line-height: 0;">
    <img src="http://downhdlogo.yy.com/hdlogo/100100/100/100/34/0753342015/u753342015-2n8KJeG.jpeg" width="100%" style="border-radius: 50%; border: 1px solid {{ borderColor }};">
  </p>
  <div style="text-align: center; line-height: 16px;">
    <p style="white-space: nowrap; margin: 0;">
        第二名
    </p>
    <p style="white-space: nowrap; margin: 0;">用户名</p>
    <p style="white-space: nowrap; margin: 0;">345热度</p>
  </div>

</div>
