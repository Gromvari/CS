const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const textParser = bodyParser.text();
const jsonParser = bodyParser.json();

app.post('/', textParser, function (req, res) {
	
	console.log("I just got touched OwO ");
	var wrt = req.body + "\r\n";
	fs.appendFile('schedule.txt', wrt, function (err) {
		if(err) throw err;
		console.log('schedule updated');
	});
	
	
})

const server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	if(host === "::") host = "localHost";
	
	console.log("app listening at http://%s:%s", host, port);
});