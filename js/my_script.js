$(function() {

	var socket = io.connect();
	$('form').submit(function() {
		socket.emit('msg', $('input').val());
		$('input').val('');
		return false;
	});
	socket.on('msg', function(data) {
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