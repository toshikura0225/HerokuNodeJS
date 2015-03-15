$(function() {

	var socket = io.connect();
	$('form').submit(function() {
		//socket.emit('msg', $('input').val());
		//$('input').val('');
		
		var data = 
		[{
			"division": "asd",
			"person": [
				{ "name": 'asdf', "age": 21 },
				{ "name": 'fse', "age": 56 },
				{ "name": 'fs', "age": 33 }
			]
		},
		{
			"division": "sfe",
			"person": [
				{ "name": 'fgr', "age": 44 },
				{ "name": 'fse', "age": 19 },
				{ "name": 'se', "age": 26 }
			]
		}];
		
		socket.emit('msg', JSON.stringify(data));
		return false;
	});
	socket.on('msg', function(data) {
		var obj = jQuery.parseJSON(data);
		alert(obj[0].division);
		$('div').prepend(data + '<br>');
	});
	
});


function send(msg)
{
	$.ajax({
		type: 'POST',
		url: msg,

		success: function(data, textStatus){
		  // 成功したとき
		  // data にサーバーから返された html が入る
		  //alert(data);
		},
		error: function(xhr, textStatus, errorThrown){
		  // エラー処理
		  alert("error");
		}
	});
}