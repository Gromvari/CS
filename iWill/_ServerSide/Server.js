const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const textParser = bodyParser.text();


app.post('/', textParser, function (req, res) {
	console.log("I just got touched OwO" + req.body);
	
})

const server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	if(host === "::") host = "localHost";
	
	console.log("app listening at http://%s:%s", host, port);
});