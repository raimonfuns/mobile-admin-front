<div id="{{ id }}" 
	class="banner component" 
	style="
	position: absolute;
	width: {{ style.width }}px;
	margin-left: {{ style.marginLeft }}px;
	top: {{ style.top }}px;
	left: {{ style.left }}{{ if (style.left + '').indexOf('%') == -1 }}px{{ /if }};"
	data-category="{{ category }}">
	<img class="componentImg" src={{ url }} width="100%" height="100%" style="vertical-align: top;">		
</div>
