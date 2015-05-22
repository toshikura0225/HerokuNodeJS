var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var g_key = "default";

var app = http.createServer(function(req, res)
{
	
	var url_parts = url.parse(req.url);
	
	console.log("★★★" + url_parts.pathname);
	
	if (path.existsSync("." + url_parts.pathname))
	{ 
		var src= fs.readFileSync("." + url_parts.pathname);
		res.writeHead(200);
		res.write(src);
		res.end();
	}
	else
	{
		res.writeHead(200);
		res.write("Nooooooooooot found!");
		res.end();
	}

	
}).listen(process.env.PORT || 3000);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket)
{
	
	socket.on('msg', function(data)
	{
		//io.sockets.emit('msg', data);
		socket.broadcast.emit('msg', data);
	});
  
	socket.on('polling', function(data)
	{
		//io.sockets.emit('msg', data);
		socket.broadcast.emit('polling', data);
	});
  
	socket.on('selecting', function(data)
	{
		
		//io.sockets.emit('msg', data);
		console.log("======================" + data);
		var obj = JSON.parse(data);
		
		if( obj.key == g_key)
		{
			console.log("======================" + obj.key);
			console.log("======================" + obj.sequence);
		
			socket.broadcast.emit('selecting', obj.sequence);
		}
		else
		{
			// DO NOTHING...
			console.log("============invalid key==========");
		}
	});
	
	socket.on('write_key', function(data)
	{
		g_key = data;
		console.log("======================key registerd : " + data);
	});
	
});