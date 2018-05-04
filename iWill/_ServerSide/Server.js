'use strict';

const express =		require('express');
const bodyParser = 	require('body-parser');
const fs = 			require('fs');
const readLine =	require('readline');
const formidable = 	require('formidable');


const saveName = 'schedule.txt';


var s = new Array();
var validatedIP = new Array();
var club = new Array();

const app = express();
const login = express();
const ext = express();
const textParser = bodyParser.text();
const formParser = bodyParser.urlencoded({ extended: true });


const esl = app.listen(8888, () => {
	console.log("External active " + esl.address().address + " " + esl.address().port);
});


const server = app.listen(3000, '10.101.249.125', function() {
	var host = server.address().address;
	var port = server.address().port;
	if(host === "::") host = "localHost";
	console.log("Server listening at http://%s:%s", host, port);
	
	readSave();
	
});

const lserver = login.listen(8888, '10.101.249.125', () => {
	var host = lserver.address().address;
	var port = lserver.address().port;
	console.log("Login listening at http://%s:%s", host, port);
	
	fs.readFile('aClub.txt', 'utf8', (err, data) => {
		if(err) throw err;
		club = JSON.parse(data);
	});
});


app.post('/jst', textParser, function (req, res) {
	
	console.log("Server contacted ");
	
	var wrt = req.body + "\r\n";
	var r = proccessBody( wrt );
	
});

app.get('/', textParser, (req, res) => {
	console.log("Server contacted via GET");
	res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
	res.write(JSON.stringify(s));
	res.end();
});

app.get('/jst', textParser, (req, res) => {
	
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
		fs.readFile('../JST.html', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});

//{SERVING : JS
app.get('/_Scripts/viewManager.js', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving viewManager.js");
		fs.readFile('../_Scripts/viewManager.js', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/javascript'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
app.get('/_Scripts/alertManager.js', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving alertManager.js");
		fs.readFile('../_Scripts/alertManager.js', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/javascript'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
app.get('/_Scripts/eventManager.js', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving eventManager.js");
		fs.readFile('../_Scripts/eventManager.js', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/javascript'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
app.get('/_Scripts/global.js', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving global.js");
		fs.readFile('../_Scripts/global.js', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/javascript'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
app.get('/_Scripts/graphManager.js', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving graphManager.js");
		fs.readFile('../_Scripts/graphManager.js', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/javascript'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
//}

//{SERVING : CSS
app.get('/standard.css', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving standard.css");
		fs.readFile('../standard.css', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/css'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
app.get('/alert.css', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving alert.css");
		fs.readFile('../alert.css', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/css'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
app.get('/view.css', (req, res) => {
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
	console.log("Serving view.css");
		fs.readFile('../view.css', 'utf8', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'text/css'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
//}

//{SERVING : OTHER
app.get('/_Sounds/alertPing.mp3', textParser, (req, res) => {
	
	if(validatedIP.indexOf(req.connection.remoteAddress) != -1)
	{
		fs.readFile('../_Sounds/alertPing.mp3', 'binary', (err, data) => {
			res.writeHead(200, {'Content-Type' : 'audio/mpeg'});
			res.write(data);
			res.end();
		});
	}
	else
	{
		deny( res );
	}
});
//}

//{LOGIN
login.post('/login', formParser,(req, res) => {
	console.log("\nLogin Attempt");
	console.log("Login Credentials");
	var un = req.body.username;
	var pw = req.body.password;
	console.log(" Username: " + un);
	console.log(" Password: " + pw);
	
	var ret = false;
		for(i = 0; i < club.length; i++)
		{
			if( un === club[i].username && pw === club[i].password)
			{
				ret = true;
				console.log("Correct Login");
				console.log("Added User: " + req.connection.remoteAddress + "\n");
				validatedIP.push(req.connection.remoteAddress);
				res.writeHead(301, {'Location' : 'http://10.101.249.125:3000/jst'});//'https://whynogod.files.wordpress.com/2011/01/d4hbs.png?w=640'});
				res.end();
			}

		}
		if( !ret)
		{
			fs.readFile('login.html','utf8', (err, data) => {
				res.writeHead(200, {'Content-Type' : 'text/html'});
				res.write(data);
				res.end();
			});
		}

});

login.get('/', textParser, (req, res) => {
	console.log("Login contacted via GET");
	fs.readFile('login.html', (err, data) => {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.write(data);
		res.end();
	});
});

login.get('/login.css', textParser, (req, res) => {
	console.log("  Served: login.css");
	fs.readFile('login.css', (err, data) => {
		res.writeHead(200, {'Content-Type' : 'text/css'});
		res.write(data);
		res.end();
	});
});
//}

//{HELPER FUNCTIONS
	
function deny( res )
{
	console.log('\nServer Permission Denied');
		res.writeHead(403, {'Content-Type': 'text/html'});
		res.end('403: Permission Denied');
}
function readSave()
{
	fs.readFile(saveName, 'utf8',(err, data) => {   
		if(err) throw err;
		s = JSON.parse(data);
		   console.log("save loaded from file");
	});
	
}

function proccessBody( r )
{
	 var i = r.indexOf('|') + 1;
	 var h = r.substring(0, i);
	   console.log("Request: " + h);
	   
	if(h == "Ping|")
		return "ping has been processed";
	
	var b = r.substring(i);
	if( h == "Created|")
	{
		s.push(JSON.parse(b));
		 
		fs.writeFile(saveName, JSON.stringify(s), function (err) {
			if(err) throw err;
			  console.log(saveName + ' updated');
			  console.log(s);
		});
		return "event processed";
	}
	 if( h == "Updated|")
	 {
		 bJSON = JSON.parse(b);
		 
		 var index = findID(bJSON.e_id);
		 s[index] = bJSON;
		 
		 fs.writeFile(saveName, JSON.stringify(s), function (err) {
			if(err) throw err;
			  console.log(saveName + ' updated');
			  console.log(s);
		});
		 return "event processed";
	 }
	if( h == "Deleted|")
	{
		bJSON = JSON.parse(b);
		
		var index = findID(bJSON.e_id);
		if(index != -1){
			s.splice(index, 1); 
			 
			fs.writeFile(saveName, JSON.stringify(s), function (err) {
			if(err) throw err;
			  console.log(saveName + ' updated');
			  console.log(s);
			});
		}
		return "event processed";
	}
	return "no match";
}
	 
	 
//{ Helper Functions
function findID(id)
{
	for(i = 0; i < s.length; i++)
	{
		if(s[i].e_id == id)
			return i;
	}
	return -1;
}
