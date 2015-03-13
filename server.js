var http = require('http');
var fs = require('fs');
var url = require('url');

var http_src = fs.readFileSync('./index.html');
var js_src = fs.readFileSync('./js/my_script.js');

var app = http.createServer(function(req, res) {
	
	var url_parts = url.parse(req.url);
	
	console.log(url_parts.pathname);
	
	if(url_parts.pathname == '/index.html')
	{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(http_src);
		res.end();
	}
	else if(url_parts.pathname == '/js/my_script.js')
	{
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(js_src);
		res.end();
	}
	
}).listen(process.env.PORT || 3000);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});