$(function() {

	$('#button1').click(function(){
		alert("click");
	});
	
	var socket = io.connect();
	$('form').submit(function() {
		socket.emit('msg', $('input').val());
		$('input').val('');
		return false;
	});
	socket.on('msg', function(data) {
		$('div').prepend(data + '<br>');
		kick(data);
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
		  alert(data);
		},
		error: function(xhr, textStatus, errorThrown){
		  // エラー処理
		  alert("error");
		}
	});
}

var flag = true;
function kick(msg)
{
	send("index.html");
	
	if(flag)
	{
		send("http://127.0.0.1:8000/GPIO/4/value/1");	// HIGH
		flag = false;
	}
	else
	{
		send("http://127.0.0.1:8000/GPIO/4/value/0");	// LOW
		flag = true;
	}
}
