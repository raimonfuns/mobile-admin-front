var swal = require('sweetalert');

function showMsg(text,c,pop) {
	var opt={
		confirmButtonText:'确定',
		title:text,
		closeOnConfirm:pop!='undefined'?pop:true
	};
	swal(opt,function(){
		if (c) c();
	});
	opt=null;
}

function confirm(text,y,n,yp,np) {
	var opt={
		showCancelButton: true,
		confirmButtonText:'确定',
		cancelButtonText:'取消',
		title:text,
		closeOnConfirm: yp!='undefined'?yp:true,
		closeOnCancel: np!='undefined'?np:true
	};
	swal(opt,function(isConfirm){
	  	if (isConfirm) {
			if (y) y();
	  	} else {
		    if (n) n();
	  	}
	});
	opt=null;
}


function typeMsg(text,type,c,pop) {
	var opt={
		title:text,
		confirmButtonText:'确定',
		type:type,
		closeOnConfirm: pop!='undefined'?pop:true
	};
	swal(opt,function(){
		if (c) c();
	});
	opt=null;
}

exports.showMsg=showMsg;
exports.confirm=confirm;
exports.typeMsg=typeMsg;