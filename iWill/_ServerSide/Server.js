const http = require('http');
const fs = require('fs');

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
	// let body = [];
	// request.on('error', (err) => {
		// console.error(err);
	// }).on('data', (chunk) => {
		// body.push(chunk);
	// }).on('end', () => {
		// body = Buffer.concat(body).toString();
	// });
	
	//response.statusCode = 200;
	// response.setHeader('Content-Type', 'text/plain');
	// response.end('Hello World?');
	
	
	
	// let body = [];
// request.on('data', (chunk) => {
  // body.push(chunk);
// }).on('end', () => {
  // body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});

fs.writeFile('incoming.txt', "RODL", (err) => {
		if(err) throw err;
		console.log('Saved!');
	});	
	
	
	console.log('I just got touched (OwO)' );

	
}).listen(port);
// const server = http.createServer((request, response) => {
	// if(request.method == 'POST'){
		// var jsonString = '';
		// request.on('data', function(data) {
			// jsonString += data;
		// });
		// request.on('end', function() {
			// console.log(JSON.parse(jsonString));
		// });
	// }
// });
	
// server.listen(port, () => {
	// console.log("Server started on " + port);
// });