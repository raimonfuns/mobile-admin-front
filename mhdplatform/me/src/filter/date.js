import Vue from 'vue'

// filter
Vue.filter('date', function (timesStamp) {
	var date = new Date(timesStamp);
	
	var Y = date.getFullYear() + '-',
	M = date.getMonth()+1,
	D = date.getDate(),
	h = date.getHours(),
	m = date.getMinutes(),
	s = date.getSeconds(); 

	M = (M < 10 ? '0' + M : M) + '-';
	D = (D < 10 ? '0' + D : D) + '  ';
	h = (h < 10 ? '0' + h : h) + ':';
	m = (m < 10 ? '0' + m : m) + ':';
	s = s < 10 ? '0' + s : s;

  return Y + M + D + h + m + s;
})