$(function() {

	socket = io.connect();
	$('form').submit(function() {
		socket.emit('msg', $('input').val());
		$('input').val('');
		return false;
	});
	socket.on('msg', function(data) {
		$('div').prepend(data + '<br>');
		received('msg', data);
	});
	
});

var socket;

function send(msg)
{
	socket.emit('msg', msg);
	/*
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
	*/
}