const http = require('http');

const server = http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(request.url);
	response.end();
}).listen(8080);